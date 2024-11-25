<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportsController extends Controller
{
    /**
     * Display sales reports in a given range and type.
     */
    public function sales(): Response
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates(request());

        $sales = $this->getSalesData($startDate, $endDate);

        return Inertia::render('reports/SalesOverTime', [
            'sales' => $sales,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportType' => $reportType,
        ]);
    }

    /**
     * Export sales data to an Excel file.
     */
    public function exportExcel(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $data = $this->getSalesData($startDate, $endDate);

        $fileName = "sales-report-{$reportType}-(" . 
            $startDate->format('Y-m-d') . "_to_" . $endDate->format('Y-m-d') . ").xlsx";

        return Excel::download(
            new \App\Exports\SalesExport($data),
            $fileName
        );
    }

    /**
     * Export sales data to a PDF file.
     */
    public function exportPdf(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $data = $this->getSalesData($startDate, $endDate);

        $title = "SALES REPORT - " . strtoupper($reportType ?? 'monthly') . 
            " (" . $startDate->format('d/m/Y') . " to " . $endDate->format('d/m/Y') . ")";

        $pdf = Pdf::loadView('pdf.sales-report', compact('data', 'title'));

        $fileName = "sales-report-{$reportType}-(" . 
            $startDate->format('Y-m-d') . "_to_" . $endDate->format('Y-m-d') . ").pdf";

        return $pdf->download($fileName);
    }

    /**
     * Parse request for report dates and type.
     */
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

    /**
     * Fetch sales data for a given date range.
     */
    private function getSalesData($startDate, $endDate)
    {
        return Order::select(
            DB::raw("DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date"),
            DB::raw('COUNT(orders.id) as transaction_count'),
            DB::raw('SUM(order_items.total) as total_sales'),
            DB::raw('SUM(order_items.profit) as total_profit'),
            DB::raw('AVG(order_items.total) as avg_sales')
        )
            ->where('status', 'paid')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->groupBy(DB::raw("DATE_FORMAT(orders.created_at, '%Y-%m-%d')"))
            ->get();
    }
}
