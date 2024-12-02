<?php

namespace App\Http\Controllers;

use App\Models\ProductCompany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCompanyController extends Controller
{
    public function index(): Response
    {
        $companies = ProductCompany::get();

        return Inertia::render("product-companies/Index", [
            "companies"=> $companies,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "name"=> "required|string|max:100",
        ]);

        $validated['company_id'] = auth()->user()->company_id; 

        ProductCompany::create($validated);

        return back();
    }

    public function destroy(ProductCompany $productCompany): RedirectResponse
    {
        $productCompany->delete();

        return back();
    }
}
