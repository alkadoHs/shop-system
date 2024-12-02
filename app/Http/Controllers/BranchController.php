<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use App\Models\Scopes\BranchScope;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('branches/Index', [
            'branches' => Inertia::defer(fn () =>  Branch::withCount(['users', 'products' => function (Builder $query) {
                $query->withoutGlobalScope(BranchScope::class);
            }])->get()),
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
    public function store(StoreBranchRequest $request)
    {
        $validated = $request->validated();

        $validated['company_id'] = auth()->user()->company_id;

        Branch::create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $validated = $request->validated();

        $branch->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        try {
            $branch->delete();
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => 'Cannot delete branch because it has users or products']);
        }

        return back();
    }

    public function switchBranch(Branch $branch)
    {
        auth()->user()->update(['branch_id' => $branch->id]);
        return back();
    }
}
