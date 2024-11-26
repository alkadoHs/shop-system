<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class ExpensesReportController extends Controller
{
    public function report(Request $request): Response
    {
        $filters = $this->parseFilters($request);

        $expenses = $this->getExpensesData($filters);

        return Inertia::render('reports/Expenses', [
            'expenses' => $expenses,
            'filters' => $filters,
        ]);
    }

    public function exportExcel(Request $request)
    {
        $filters = $this->parseFilters($request);

        $expenses = $this->getExpensesData($filters);

        return Excel::download(
            new \App\Exports\ExpensesReportExport($expenses),
            'expenses-report.xlsx'
        );
    }

    public function exportPdf(Request $request)
    {
        $filters = $this->parseFilters($request);

        $expenses = $this->getExpensesData($filters);

        $pdf = Pdf::loadView('pdf.expenses-report', [
            'expenses' => $expenses,
            'filters' => $filters,
            'title' => "Expenses Report",
        ]);

        return $pdf->download('expenses-report.pdf');
    }

    private function parseFilters(Request $request): array
    {
        return [
            'user_id' => $request->user_id,
            'branch_id' => $request->branch_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ];
    }

    private function getExpensesData(array $filters)
    {
        return Expense::with(['user', 'paymentMethod', 'expenseItems'])
            ->when($filters['user_id'], fn ($query) => $query->where('user_id', $filters['user_id']))
            ->when($filters['branch_id'], fn ($query) => $query->where('branch_id', $filters['branch_id']))
            ->when(
                $filters['start_date'] && $filters['end_date'],
                fn ($query) => $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']])
            )
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($expense) {
                return [
                    'user' => $expense->user->name ?? 'N/A',
                    'payment_method' => $expense->paymentMethod->name ?? 'N/A',
                    'items' => $expense->expenseItems->pluck('item')->join(', '),
                    'total_cost' => $expense->expenseItems->sum('cost'),
                    'created_at' => $expense->created_at->format('d-m-Y'),
                ];
            });
    }
}
