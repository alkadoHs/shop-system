<?php

namespace App\Http\Controllers;

use App\Exports\DeadStockExport;
use App\Models\OrderItem;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class DeadStockController extends Controller
{
    public function report(): Response
    {
        [$startDate, $endDate, $reportType] = $this->parseDateRange(request());

        $deadStocks = $this->getDeadStockData($startDate, $endDate);

        return Inertia::render('reports/DeadStocks', [
            'deadStocks' => $deadStocks,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportType'=> $reportType
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseDateRange($request);

        $deadStocks = $this->getDeadStockData($startDate, $endDate);

        return Excel::download(
            new DeadStockExport($deadStocks),
            "dead-stock-report-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).xlsx"
        );
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseDateRange($request);

        $deadStocks = $this->getDeadStockData($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.dead-stock-report', [
            'deadStocks' => $deadStocks,
            'startDate' => $startDate->format('d/m/Y'),
            'endDate' => $endDate->format('d/m/Y'),
            'title' => "Dead Stock Report $reportType",
        ]);

        return $pdf->download("dead-stock-report-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).pdf");
    }

    private function parseDateRange(Request $request): array
    {
        $startDate = $request->startDate ? Carbon::parse($request->startDate) : now()->subDays(30)->startOfDay();
        $endDate = $request->endDate ? Carbon::parse($request->endDate) : now()->endOfDay();
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

    private function getDeadStockData($startDate, $endDate)
    {
        return Product::select(
            'products.name as product_name',
            DB::raw('MAX(order_items.created_at) as last_sale_date'),
            DB::raw('SUM(order_items.qty) as quantity_sold'),
            DB::raw('DATEDIFF(NOW(), MAX(order_items.created_at)) as days_since_last_sale'),
            DB::raw('(products.stock * products.buy_price) as stock_value')
        )
        ->leftJoin('order_items', 'products.id', '=', 'order_items.product_id')
        ->where(function ($query) use ($startDate, $endDate) {
            $query->whereNull('order_items.created_at') // No sales at all
                  ->orWhere('order_items.created_at', '<', $startDate); // Last sale outside the range
        })
        ->groupBy('products.id')
        ->get();
    }
}
