<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Branch;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("purchase-order/Index",
            [
                "purchaseOrders" => Inertia::defer(fn () => PurchaseOrder::with(['supplier', 'paymentMethod', 'branch'])
                                            ->withSum('purchaseOrderItems', 'total')
                                            ->withSum('purchaseOrderItems','qty')
                                            ->orderBy('created_at', 'desc')
                                            ->limit(50)
                                            ->get())
            ]);
    }

    public function show(PurchaseOrder $purchase): Response
    {
        return Inertia::render('purchase-order/Show', [
            'purchaseOrder' => PurchaseOrder::with(['supplier', 'paymentMethod', 'branch', 'purchaseOrderItems.product'])->find($purchase->id),
            'total' => fn () => PurchaseOrder::withSum('purchaseOrderItems', 'total')->find($purchase->id)->purchase_order_items_sum_total,
        ]);    
    }


    public function create(): Response
    {
        return Inertia::render('purchase-order/Create', [
            'suppliers' => fn () => Supplier::get(),
            'paymentMethods' => fn () => PaymentMethod::withSum('orderItems', 'total')->get(),
            'products' => fn () => Product::get(),
            'branches' => fn () => Branch::get(),
            'today' => fn () => today()->format('Y-m-d'),
        ]);
    }


    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        // dd($request->all());
        $validated = $request->validate([
            'supplier_id' => 'required',
            'payment_method_id' => 'required',
            'branch_id' => 'required',
            'date' => 'required',
            'items' => 'required|array',
            'items.*.product_id' => 'required',
            'items.*.qty' => 'required|numeric',
            'items.*.buy_price' => 'required|numeric',
            'items.*.sale_price' => 'required|numeric',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $purchaseOrder = PurchaseOrder::create([
                'supplier_id' => $request->supplier_id,
                'payment_method_id' => $request->payment_method_id,
                'branch_id' => $request->branch_id,
                'date' => $request->date,
                'company_id' => auth()->user()->company_id,
            ]);

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                $product->update([
                    'buy_price' => $item['buy_price'],
                    'sale_price' => $item['sale_price'],
                ]);
                $product->increment('stock', $item['qty']);
            }
    
            $purchaseOrder->purchaseOrderItems()->createMany($request->items);

            // get the account if not exists create it
        $account = Account::firstOrCreate([
            'branch_id' => $validated['branch_id'],
            'payment_method_id' => $validated['payment_method_id'],
        ]);

        $account->decrement('amount', $purchaseOrder->purchaseOrderItems()->sum('total'));

        $account->accountTransactions()->create([
            'amount' => $purchaseOrder->purchaseOrderItems()->sum('total'),
            'type' => 'withdraw',
            'description' => "PurchaseOrder #{$purchaseOrder->id}",
            'user_id' => auth()->user()->id,
        ]);
        }, 5);

        return to_route('purchases.index');
    }
    
}
