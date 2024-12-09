<?php

namespace App\Observers;

use App\Models\PaymentMethod;

class PaymentMethodObserver
{
    public function created(PaymentMethod $paymentMethod): void
    {
        // create account for payment method
        foreach( auth()->user()->company->branches as $branch) {
            $paymentMethod->accounts()->create([
                'branch_id' => $branch->id,
                'payment_method_id' => $paymentMethod->id,
                'amount' => 0
            ]);
        }
    }
}
