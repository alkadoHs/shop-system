<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getUserBranches(Request $request)
    {
        $branches = auth()->user()->company->branches()->get();

        return response()->json($branches);
    }
}
