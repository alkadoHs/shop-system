<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function destroy(OrderItem $orderItem): RedirectResponse
    {
        $product = $orderItem->product;

        // return the qty of the product to the stock
        $product->increment('stock', $orderItem->qty);

        $orderItem->delete();

        return back();
    }

}
