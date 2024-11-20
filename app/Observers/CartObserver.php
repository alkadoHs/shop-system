<?php

namespace App\Observers;

use App\Models\Cart;

class CartObserver
{
    public function creating(Cart $cart)
    {
        $cart->user_id = auth()->user()->id;
    }
}
