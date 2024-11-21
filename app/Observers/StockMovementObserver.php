<?php

namespace App\Observers;

use App\Models\StockMovement;

class StockMovementObserver
{
    public function creating(StockMovement $stockMovement)
    {
        $stockMovement->user_id = auth()->user()->id;
        $stockMovement->branch_id = auth()->user()->branch_id;
    }
}
