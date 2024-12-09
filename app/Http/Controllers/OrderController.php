<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\CartItem;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['branch', 'user', 'paymentMethod', 'customer'])->pagitate(20);
        return Inertia::render("orders/Index", [
            'orders' => $orders
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'payment_method_id' => 'required',
            'customer' => 'nullable|string|max:50',
            'status' => 'required',
            'contact' => 'required|max:50',
            'location' => 'required|max:100',
        ]);


       DB::transaction(function () use($validated) {
           $customer = null;
           // create a customer
           if ($validated['customer'])
                $customer = Customer::create([
                    'name' => $validated['customer'],
                    'contact' => $validated['contact'],
                    'location' => $validated['location'],
                ]);
   
           // create an order
           $order = Order::create([
               'branch_id' => auth()->user()->branch_id,
               'user_id' => auth()->user()->id,
               'payment_method_id' => $validated['payment_method_id'],
               'customer_id' => $customer?->id,
               'status' => $validated['status'],
           ]);
   
           // create order items
           $orderItems = $order->orderItems()->createMany(auth()->user()->cartItems()
                ->get()
                ->map(function (CartItem $item) use( $validated) {
                $item->product->decrement('stock', $item->qty);
    
                return [
                    'product_id' => $item->product_id,
                    'qty' => $validated['status'] == 'pending' ? 0 : $item->qty,
                    'p_qty' => $validated['status'] == 'pending' ? $item->qty : 0,
                    'buy_price' => $item->buy_price,
                    'price' => $item->price,
                    'imei' => $item->imei,
                    'imei2' => $item->imei2,
                    'company' => $item->company,
                    'discount' => $item->discount,
                ];
            }));

        // get the account if not exists create it
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $validated['payment_method_id'],
        ], ['amount' => 0]);

        if($validated['status'] == 'paid') {
            $account->increment('amount', $order->orderItems()->sum('total'));

            $account->accountTransactions()->create([
                'amount' => $order->orderItems()->sum('total'),
                'type' => 'deposit',
                'description' => "Order #{$order->id}",
                'user_id' => auth()->user()->id,
            ]);
        }

           // clear cart
         auth()->user()->cart()->delete();

       }, 5);

       return redirect()->back();
    }
}
