<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ExpensesReportExport implements FromView
{
    protected $expenses;

    public function __construct($expenses)
    {
        $this->expenses = $expenses;
    }

    public function view(): View
    {
        return view('excel.expenses-report', [
            'expenses' => $this->expenses,
        ]);
    }
}
