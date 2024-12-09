<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentMethodController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("payments/Index", [
            'payments' => PaymentMethod::withSum('accounts', 'amount')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string|max:50',
            'number' => 'nullable|string|max:20'
        ]);

        $validate['company_id'] = auth()->user()->company_id;

        PaymentMethod::create($validate);

        return redirect()->back();
    }


    public function destroy(PaymentMethod $payment): RedirectResponse
    {
        $payment->delete();

        return redirect()->back();
    }
}
