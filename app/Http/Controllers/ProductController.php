<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("products/Index", [
            'products' => Product::get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render("products/Create");
    }

    public function edit(Product $product): Response
    {
        return Inertia::render("products/Edit", [
            'product' => $product
        ]);
    }

    public function store(Request $request ): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'buy_price' => 'required|numeric|max:9999999999',
            'sale_price' => 'required|numeric|max:9999999999',
            'whole_price' => 'required|numeric|max:9999999999',
            'stock' => 'required|numeric|max:99999999',
            'whole_stock' => 'required|numeric|max:99999999',
            'stock_alert' => 'required|numeric|max:99999999',
            'expire_date' => 'nullable'
        ]);

        Product::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'buy_price' => 'required|numeric|max:9999999999',
            'sale_price' => 'required|numeric|max:9999999999',
            'whole_price' => 'required|numeric|max:9999999999',
            'stock' => 'required|numeric|max:99999999',
            'whole_stock' => 'required|numeric|max:99999999',
            'stock_alert' => 'required|numeric|max:99999999',
            'expire_date' => 'nullable'
        ]);

        $product->update($validated);

        return to_route('products.index');
    }


    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return to_route('products.index');
    }
}
