<?php

namespace App\Http\Controllers\Reports;

use App\Exports\GeneralSalesExport;
use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class GeneralSalesReportController extends Controller
{
    public function report
    (): Response
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates(request());

        // Query to get the sales data by product
        $generalSales = $this->getgeneralSales($startDate, $endDate);

        return Inertia::render('reports/GeneralSalesReport', [
            'generalSales' => $generalSales,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportType' => $reportType,
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $generalSales = $this->getgeneralSales($startDate, $endDate);

        return Excel::download(
            new GeneralSalesExport($generalSales),
            "general-sales-report-{$reportType}-({$startDate->format('Y-m-d')}_to_{$endDate->format('Y-m-d')}).xlsx"
        );
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate, $reportType] = $this->parseReportDates($request);

        $generalSales = $this->getgeneralSales($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.general-sales-report', [
            'generalSales' => $generalSales,
            'title' => "General sales Report - {$reportType}",
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

    private function getgeneralSales($startDate, $endDate)
    {
        return OrderItem::whereBetween('order_items.created_at', [$startDate, $endDate])
            ->with(['order' => ['user', 'customer'], 'product'])->orderBy('created_at', 'desc')
            ->get();
    }
}
