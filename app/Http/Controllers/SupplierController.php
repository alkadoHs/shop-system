<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("suppliers/Index", [
            'suppliers' => Inertia::defer(fn () => Supplier::get())
        ]);
    }


    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'=> 'required|string|max:100',
            'contact'=> 'nullable|string|max:255',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        Supplier::create($validated);

        return back();
    }

    public function update(Request $request, Supplier $supplier): RedirectResponse
    {
        $validated = $request->validate([
            'name'=> 'required|string|max:100',
            'contact'=> 'nullable|string|max:255',
        ]);

        $supplier->update($validated);

        return back();
    }


    public function destroy(Supplier $supplier): RedirectResponse
    {
        try {
            $supplier->delete();
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Cannot delete supplier due to existing records.']);
        }
        
        return back();
    }
}
