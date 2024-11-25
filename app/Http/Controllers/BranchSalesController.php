<?php

namespace App\Http\Controllers;

use App\Exports\BranchSalesExport;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class BranchSalesController extends Controller
{
    public function sales(): Response
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates(request());

        // Query to get the sales data by branch
        $query = Order::select(
                'branches.name as branch_name', // Get branch name from the Branch model
                DB::raw('SUM(order_items.total) as total_sales'),
                DB::raw('COUNT(orders.id) as transaction_count'),
                DB::raw('AVG(order_items.total) as avg_sales'),
                DB::raw('SUM(order_items.profit) as total_profit')
            )
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('branches', 'orders.branch_id', '=', 'branches.id') // Join with branches table using branch_id
            ->where('orders.status', 'paid')
            ->whereBetween('orders.created_at', [$startDate, $endDate]);


        $salesByBranch = $query->groupBy('branches.name')->get();

        // Return the data to the frontend for rendering
        return Inertia::render('reports/SalesByBranch', [
            'salesByBranch' => $salesByBranch,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportType' => $reportType,
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $salesByBranch = $this->getSalesByBranch($startDate, $endDate);

        return Excel::download(
            new BranchSalesExport($salesByBranch),
            "branch-sales-report-{$reportType}-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).xlsx"
        );
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $salesByBranch = $this->getSalesByBranch($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.branch-sales-report', [
            'salesByBranch' => $salesByBranch,
            'title' => "Branch Sales Report - {$reportType}",
            'startDate' => $startDate->format('d/m/Y'),
            'endDate' => $endDate->format('d/m/Y')
        ]);

        return $pdf->download("branch-sales-report-{$reportType}-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).pdf");
    }

    private function parseReportDates(Request $request): array
    {
        $startDate = $request->startDate ? Carbon::parse($request->startDate) : now()->startOfMonth();
        $endDate = $request->endDate ? Carbon::parse($request->endDate) : now()->endOfMonth();
        $reportType = $request->reportType;

        if ($reportType) {
            switch ($reportType) {
                case 'daily':
                    $startDate = now()->startOfDay();
                    $endDate = now()->endOfDay();
                    break;
                case 'weekly':
                    $startDate = now()->startOfWeek();
                    $endDate = now()->endOfWeek();
                    break;
                case 'monthly':
                    $startDate = now()->startOfMonth();
                    $endDate = now()->endOfMonth();
                    break;
                case 'yearly':
                    $startDate = now()->startOfYear();
                    $endDate = now()->endOfYear();
                    break;
            }
        }

        return [$startDate, $endDate, $reportType];
    }

    private function getSalesByBranch($startDate, $endDate)
    {
        return Order::select(
                'branches.name as branch_name',
                DB::raw('SUM(order_items.total) as total_sales'),
                DB::raw('COUNT(orders.id) as transaction_count'),
                DB::raw('AVG(order_items.total) as avg_sales'),
                DB::raw('SUM(order_items.profit) as total_profit')
            )
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('branches', 'orders.branch_id', '=', 'branches.id')
            ->where('orders.status', 'paid')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->groupBy('branches.name')
            ->get();
    }
}
