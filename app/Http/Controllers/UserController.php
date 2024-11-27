<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render("users/Index", [
            'users' => User::with('branch')->get(),
            'branches' => \App\Models\Branch::get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required',
            'branch_id' => 'required|exists:branches,id',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        User::create($validated);

        return back();
    }
}
