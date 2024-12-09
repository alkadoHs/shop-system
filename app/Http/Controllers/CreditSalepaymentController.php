<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\CreditSalepayment;
use App\Models\Order;
use Illuminate\Http\Request;

class CreditSalepaymentController extends Controller
{
    public function store(Request $request, Order $creditSale)
    {
        $validated = $request->validate([
            'payment_method_id' => 'required',
            'amount' => 'required|numeric|max:9999999999.9|min:0',
        ]);

        $credit = Order::where('id', $creditSale->id)->withSum('orderItems', 'total')->withSum('creditSalepayments', 'amount')->first();

        $debt = $credit->order_items_sum_total - $credit->credit_salepayments_sum_amount;

        if ($debt >= $validated['amount']) {
            $creditSale->creditSalepayments()->create($validated);

            if($debt == $validated['amount']) {
                $creditSale->update(['status' => 'paid']);
            }
        } else {
            $validated['amount'] = $debt;
            $creditSale->creditSalepayments()->create($validated);

            $creditSale->update(['status' => 'paid']);
        }

        // get the account if not exists create it
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $validated['payment_method_id'],
        ]);

        $account->increment('amount', $validated['amount']);

        $account->accountTransactions()->create([
            'amount' => $validated['amount'],
            'type' => 'deposit',
            'description' => "CreditSalepayment #{$credit->id}",
            'user_id' => auth()->user()->id,
        ]);


        return back();
    }
}
