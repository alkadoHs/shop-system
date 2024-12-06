<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class GeneralSalesExport implements FromView
{
    use Exportable;

    protected $generalSales;

    /**
     * Constructor to pass the sales data
     */
    public function __construct($generalSales)
    {
        $this->generalSales = $generalSales;
    }

    /**
     * Returns the view used for Excel export
     */
    public function view(): View
    {
        return view('exports.general-sales', [
            'generalSales' => $this->generalSales,
        ]);
    }
}
