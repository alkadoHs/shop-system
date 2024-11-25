<?php

namespace App\Observers;

use App\Models\CreditSalepayment;

class CreditSalePaymentObserver
{
    public function creating(CreditSalepayment $creditSalePayment)
    {
        $creditSalePayment->branch_id = auth()->user()->branch_id;
        $creditSalePayment->user_id = auth()->id();
    }
}
