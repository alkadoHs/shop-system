<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerDashboard extends Controller
{
    public function index(): Response
    {
        return Inertia::render("SellerDashboard", [
            'totalPaidSales' => Inertia::defer(fn () => auth()->user()->orderItems()->whereRelation('order', 'status', 'paid')->whereDate('order_items.created_at', now())->sum('total')),
            'totalPendingSales' => Inertia::defer(fn () => auth()->user()->orderItems()->whereRelation('order', 'status', 'pending')->whereDate('order_items.created_at', now())->sum('total')),
            'totalCreditSales' => Inertia::defer(fn () => auth()->user()->orderItems()->whereRelation('order', 'status', 'credit')->sum('total') - auth()->user()->creditSalePayments()->whereRelation('order', 'status', 'credit')->sum('amount')),
            'totalCreditSalePayments' => Inertia::defer(fn () => auth()->user()->creditSalePayments()->whereDate('created_at', now())->sum('amount')),
            'totalExpenses' => Inertia::defer(fn () => auth()->user()->expenseItems()->whereDate('expense_items.created_at', now())->sum('cost')),
            'totalStockMovements' => Inertia::defer(fn () => auth()->user()->stockMovements()->whereDate('created_at', now())->sum('stock')),
            'transactions' => Inertia::defer(fn () => auth()->user()->orderItems()->whereDate('orders.created_at', now())->with(['order' => ['user', 'customer'], 'product'])->orderBy('orders.created_at', 'desc')->get()),
        ]);
    }
    
}
