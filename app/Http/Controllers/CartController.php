<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request, Product $product): RedirectResponse
    {
        $cart = auth()->user()->cart()->firstOrCreate();

        $productExist = CartItem::where('cart_id', $cart->id)->where('product_id', $product->id)->first();

        if ($productExist) {
            if ($productExist->qty > $product->stock) {
                return back()->withErrors(['qty' => "Stock is not enough, the current stock for the product: {$product->name} is {$product->stock}"]);
            } else {
                //TODO: solve selling by whole price here.

                // $productExist->increment('qty');

                $cart->cartItems()->create([
                    'product_id' => $product->id,
                    'price' => $product->sale_price,
                    'buy_price' => $product->buy_price,
                    'qty' => 1,
                ]);
            }
        } else {
            $cart->cartItems()->create([
                'product_id' => $product->id,
                'price' => $product->sale_price,
                'buy_price' => $product->buy_price,
                'qty' => 1,
            ]);
        }

        return back();
    }

    public function update(Request $request, CartItem $item): RedirectResponse
    {
        $validated = $request->validate([
            'qty' => 'required|numeric|min:0',
            'company' => 'required|string|max:100',
            'imei' => 'required|string|max:100',
        ]);

        $product = Product::find($item->product_id);

        if($validated['qty'] > $product->stock) {
            return back()->withErrors(['qty' => "Stock is not enough, the current stock for the product: {$product->name} is {$product->stock}"]);
        }

        $item->update($validated);

        // if ($validated['qty'] >= $product->whole_stock && ($product->whole_stock > 0 && $product->whole_price > 0)) {
        //     $item->update(['qty' => $validated['qty'], 'price' => $product->whole_price]);
        // } else {
        //     $item->update(['qty' => $validated['qty'], 'price'=> $product->sale_price]);
        // }
        
        return back();
    }

    public function remove(Request $request, CartItem $item): RedirectResponse
    {
        $item->delete();

        return back();
    }
}
