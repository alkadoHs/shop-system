<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PendingOrderController extends Controller
{
    public function index(): Response
    {
        $search = request()->search ?? null;

        $orders = Order::with(['customer', 'user', 'orderItems.product'])
                                ->where('status', 'pending')
                                ->where(function ($query) use ($search) {
                                    $query->whereRelation('customer','name', 'LIKE', "%{$search}%")
                                          ->orWhere('id', 'LIKE', "%{$search}%");
                                })
                                ->withSum('orderItems', 'total_p_qty')
                                ->withCount('orderItems')
                                ->latest()->paginate(25);

        return Inertia::render("pending-orders/Index", [
            "orders"=> $orders
        ]);
    }

    public function confirm(Request $request, Order $order): RedirectResponse
    {
        $order->orderItems()->get(['id', 'p_qty'])->map(function (OrderItem $orderItem)  {
            $orderItem->update(['qty' => $orderItem->p_qty]);
            return [
                'id'=> $orderItem->id,
            ];
        });

        $order->update(['status' => 'paid']);

        return back();
    }


    public function update(Request $request, OrderItem $orderItem): RedirectResponse
    {
        $validated = $request->validate([
            'qty' => 'required|numeric|max:99999999|min:0',
        ]);

        if ($validated['qty'] > $orderItem->p_qty) {
            return back()->withErrors(['qty' => 'This quantity is too high.']);
        }

        $orderItem->update($validated);

        return back();
    }

    public function confirm_all(Request $request, Order $order): RedirectResponse
    {
        $items = $order->orderItems()->get();

        // if p_balance is found, return to it's product's stock
        foreach ($items as $item) {
            $product = Product::find($item->product_id);

            $product->increment('stock', $item->p_balance);
        }

        // update the order status
        $order->update(['status' => 'paid']);

        return back();
    }
}
