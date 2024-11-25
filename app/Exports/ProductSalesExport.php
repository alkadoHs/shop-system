<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\Exportable;

class ProductSalesExport implements FromView
{
    use Exportable;

    protected $salesByProduct;

    /**
     * Constructor to pass the sales data
     */
    public function __construct($salesByProduct)
    {
        $this->salesByProduct = $salesByProduct;
    }

    /**
     * Returns the view used for Excel export
     */
    public function view(): View
    {
        return view('exports.product-sales', [
            'salesByProduct' => $this->salesByProduct,
        ]);
    }
}
