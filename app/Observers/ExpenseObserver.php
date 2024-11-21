<?php

namespace App\Observers;

use App\Models\Expense;

class ExpenseObserver
{
    public function creating(Expense $expense)
    {
        if (!$expense->user_id) {
            $expense->user_id = auth()->user()->id;
        }
        if (!$expense->branch_id) {
            $expense->branch_id = auth()->user()->branch_id;
        }
    }
}
