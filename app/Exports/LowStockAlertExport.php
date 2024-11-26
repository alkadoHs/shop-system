<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class LowStockAlertExport implements FromView
{
    protected $lowStockProducts;

    public function __construct($lowStockProducts)
    {
        $this->lowStockProducts = $lowStockProducts;
    }

    public function view(): View
    {
        return view('exports.low-stock-alerts', [
            'lowStockProducts' => $this->lowStockProducts,
        ]);
    }
}
