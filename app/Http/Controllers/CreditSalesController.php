<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreditSalesController extends Controller
{
    public function index(): Response
    {
        $search = request()->search ?? null;

        $creditSales = Order::with(['customer', 'user'])
                                ->where('status', 'credit')
                                ->where(function ($query) use ($search) {
                                    $query->whereRelation('customer','name', 'LIKE', "%{$search}%")
                                          ->orWhere('id', 'LIKE', "%{$search}%");
                                })
                                ->withSum('creditSalepayments', 'amount')
                                ->withSum('orderItems', 'total')
                                ->latest()->paginate(25);

        return inertia('credit-sales/Index', [
            'creditSales' => $creditSales,
        ]);
    }

    public function show(Order $creditSale)
    {
        $credit = Order::where('id', $creditSale->id)->with(['user', 'customer'])->withSum('creditSalepayments', 'amount')->withSum('orderItems', 'total')->first();
        

        return Inertia::render('credit-sales/Payment', [
            'creditSale' => $credit,
            'creditSalePayments' => fn () => $creditSale->creditSalepayments()->with(['user', 'paymentMethod'])->latest()->get(),
            'payments' => fn () => PaymentMethod::get(['name', 'id']),
            'items' => fn () => $creditSale->orderItems()->with('product')->get(),
        ]);
    }
}
