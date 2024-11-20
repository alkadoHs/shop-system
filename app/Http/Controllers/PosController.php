<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PosController extends Controller
{
    public function index(): Response
    {
        Cart::where('user_id', auth()->id())->firstOrCreate();
        
        $cartItems = auth()->user()->cartItems()->with('product')->get();

        return Inertia::render("pos/Index", [
            "products" => fn () => Product::limit(13)->get(),
            "cartItems" => $cartItems,
        ]);
    }

}
