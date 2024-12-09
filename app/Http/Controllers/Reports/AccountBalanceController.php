<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountBalanceController extends Controller
{
    public function index(): Response
    {
        $branchAccounts = Branch::with(['accounts.paymentMethod'])
                            ->withSum('accounts', 'amount')
                            ->get();


        return Inertia::render("reports/AccountBalance", [
            'branchAccounts' => $branchAccounts,
            'allAccounts'=> fn () => PaymentMethod::withSum('accounts', 'amount')->get()
        ]);
    }
}
