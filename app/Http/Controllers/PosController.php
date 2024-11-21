<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PosController extends Controller
{
    public function index(): Response
    {
        $search = request()->search ?? null;

        Cart::where('user_id', auth()->id())->firstOrCreate();
        
        $cartItems = auth()->user()->cartItems()->with('product')->get();

        return Inertia::render("pos/Index", [
            "products" => fn () => Product::where('name', 'LIKE', "%{$search}%")->limit(10)->get(),
            "cartItems" => $cartItems,
            "paymentMethods" => fn () => PaymentMethod::get(),
            "total" => auth()->user()->cartItems()->get()->reduce(fn ($total, CartItem $item) => $total + ($item->qty * $item->price), 0),
        ]);
    }

}
