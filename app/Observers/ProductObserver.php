<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{
    public function creating(Product $product)
    {
       $product->capital = $product->buy_price * $product->stock;
    }
}
