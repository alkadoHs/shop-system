<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockMovementRequest;
use App\Http\Requests\UpdateStockMovementRequest;
use App\Models\Product;
use App\Models\StockMovement;
use Inertia\Response;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $searchProduct = request()->searchProduct ?? null;
        $search = request()->search ?? null;

        $stockMovements = StockMovement::whereRelation('product', 'name', 'LIKE', "%{$search}%")->with(['product', 'user'])
                                        ->where('branch_id', auth()->user()->branch_id)
                                        ->latest()
                                        ->paginate(25);
        $products = Product::where('name', 'LIKE', "%{$searchProduct}%")->paginate(500);

        return inertia('stock-movements/Index', [
            'stockMovements' => $stockMovements,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockMovementRequest $request)
    {
        $validated = $request->validated();

        $product = Product::find($validated['product_id']);
        $validated['last_stock'] = $product->stock;

        switch ($validated['status']) {
            case 'in':
                StockMovement::create($validated);
                $product->increment('stock', $validated['stock']);
                break;
            default:
                if ($product->stock < $validated['stock']) {
                    return back()->withErrors(['stock' => 'Stock not enough']);
                }
                $product->decrement('stock', $validated['stock']);
                StockMovement::create($validated);
                break;
        }
        
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(StockMovement $stockMovement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockMovement $stockMovement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockMovementRequest $request, StockMovement $stockMovement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockMovement $stockMovement)
    {
        //
    }
}
