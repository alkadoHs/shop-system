<?php

namespace App\Http\Controllers;

use App\Models\ExpenseItem;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    public function index(): Response
    {
        $startDate = request()->startDate ?? Carbon::today()->startOfDay();
        $endDate = request()->endDate ?? Carbon::today()->endOfDay();
        
        // Get the past 6 months
        $months = collect(range(0, 5))->map(function ($i) {
            return Carbon::now()->subMonths($i)->format('Y-m'); // Format: YYYY-MM
        });
    
        // Get sales and profit data for the filtered date range
        $salesData = collect();
        $profitData = collect();
    
        foreach ($months as $month) {
            $sales = OrderItem::whereHas('order', function ($query) {
                $query->where('status', 'paid');
            })
            ->whereMonth('created_at', Carbon::parse($month)->month)
            ->whereYear('created_at', Carbon::parse($month)->year)
            // ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            //     return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
            // })
            ->sum('total');
    
            $profit = OrderItem::whereHas('order', function ($query) {
                $query->where('status', 'paid');
            })
            ->whereMonth('created_at', Carbon::parse($month)->month)
            ->whereYear('created_at', Carbon::parse($month)->year)
            // ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            //     return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
            // })
            ->sum('profit');
    
            $salesData->push($sales);
            $profitData->push($profit);
        }
    
        // Get expenses data for the filtered date range
        $expensesData = collect();
        foreach ($months as $month) {
            $expenses = ExpenseItem::whereMonth('created_at', Carbon::parse($month)->month)
            ->whereYear('created_at', Carbon::parse($month)->year)
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
            })
            ->sum('cost');
        
            $expensesData->push($expenses);
        }
    
        return Inertia::render("Dashboard", [
            'capital' => Inertia::defer(function () use ($startDate, $endDate) {
                return Product::sum('capital');
            }),
            'totalProducts'=> Inertia::defer(function () use ($startDate, $endDate) {
                return Product::sum('stock');
            }),
            'sales' => Inertia::defer(function () use ($startDate, $endDate) {
                return OrderItem::whereRelation('order', 'status', 'paid')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                    })
                    ->sum('total');
            }),
            'creditSales'=> Inertia::defer(function () use ($startDate, $endDate) {
                return OrderItem::whereRelation('order', 'status', 'credit')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                    })
                    ->sum('total');
            }),
            'pendingSales' => Inertia::defer(function () use ($startDate, $endDate) {
                return OrderItem::whereRelation('order', 'status', 'pending')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                    })
                    ->sum('total_p_qty');
            }),
            'profit' => Inertia::defer(function () use ($startDate, $endDate) {
                return OrderItem::whereRelation('order', 'status', 'paid')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                    })
                    ->sum('profit');
            }),
            'creditSalesProfit' => Inertia::defer(function () use ($startDate, $endDate) {
                return OrderItem::whereRelation('order', 'status', 'credit')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                    })
                    ->sum('profit');
            }),
            'expenses' => Inertia::defer(function () use ($startDate, $endDate) {
                return ExpenseItem::when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                    return $query->whereDate('created_at', '>=', $startDate)->whereDate('created_at', '<=', $endDate);
                })
                ->sum('cost');
            }),
            'lowStockProducts' => Inertia::defer(function () {
                return Product::whereColumn('stock', '<=', 'stock_alert')->count();
            }),
            'topSellingProducts' => Inertia::defer(function () {
                return Product::withCount('orderItems')
                    ->orderBy('order_items_count', 'desc')
                    ->limit(20)
                    ->count();
            }),
            'expiredProducts' => Inertia::defer(function () {
                return Product::whereDate('expire_date', '<=', now())->count();
            }),
            'zeroStockProducts' => Inertia::defer(function () {
                return Product::where('stock', 0)->count();
            }),
    
            'salesData' => Inertia::defer(function () use ($salesData) {
                return $salesData;
            }),
            'profitData' => Inertia::defer(function () use ($profitData) {
                return $profitData;
            }),
            'expensesData' => Inertia::defer(function () use ($expensesData) {
                return $expensesData;
            }),
            'months' => Inertia::defer(function () use ($months) {
                return $months;
            }),
        ]);
    }
    

}
