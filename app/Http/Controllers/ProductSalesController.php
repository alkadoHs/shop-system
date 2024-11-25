<?php

namespace App\Http\Controllers;

use App\Exports\ProductSalesExport;
use App\Models\OrderItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class ProductSalesController extends Controller
{
    public function sales(): Response
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates(request());

        // Query to get the sales data by product
        $salesByProduct = $this->getSalesByProduct($startDate, $endDate);

        return Inertia::render('reports/SalesByProduct', [
            'salesByProduct' => $salesByProduct,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportType' => $reportType,
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $salesByProduct = $this->getSalesByProduct($startDate, $endDate);

        return Excel::download(
            new ProductSalesExport($salesByProduct),
            "product-sales-report-{$reportType}-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).xlsx"
        );
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $salesByProduct = $this->getSalesByProduct($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.product-sales-report', [
            'salesByProduct' => $salesByProduct,
            'title' => "Product Sales Report - {$reportType}",
            'startDate' => $startDate->format('d/m/Y'),
            'endDate' => $endDate->format('d/m/Y')
        ]);

        return $pdf->download("product-sales-report-{$reportType}-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).pdf");
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

    private function getSalesByProduct($startDate, $endDate)
    {
        return OrderItem::select(
                'products.name as product_name',
                DB::raw('COUNT(order_items.product_id) as transaction_count'),
                DB::raw('SUM(order_items.qty) as quantity_sold'),
                DB::raw('SUM(order_items.total) as total_revenue'),
                DB::raw('AVG(order_items.price) as avg_sale_price')
            )
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->groupBy('products.name')
            ->get();
    }
}
