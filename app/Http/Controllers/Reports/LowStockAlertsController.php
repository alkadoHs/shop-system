<?php

namespace App\Http\Controllers\Reports;

use App\Exports\LowStockAlertExport;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class LowStockAlertsController extends Controller
{
    public function report(): Response
    {
        $lowStockProducts = $this->getLowStockData();

        return Inertia::render('reports/LowStockAlerts', [
            'lowStockProducts' => $lowStockProducts,
        ]);
    }

    public function exportExcel()
    {
        $lowStockProducts = $this->getLowStockData();

        return Excel::download(
            new LowStockAlertExport($lowStockProducts),
            "low-stock-alerts.xlsx"
        );
    }

    public function exportPdf()
    {
        $lowStockProducts = $this->getLowStockData();

        $pdf = Pdf::loadView('pdf.low-stock-alerts', [
            'lowStockProducts' => $lowStockProducts,
            'title' => "Low Stock Alerts",
        ]);

        return $pdf->download('low-stock-alerts.pdf');
    }

    private function getLowStockData()
    {
        $threshold = 10; // Define the low stock threshold
        return Product::select('name as product_name', 'stock', 'buy_price')
            ->whereColumn('stock', '<=', 'stock_alert')
            ->get();
    }
}
