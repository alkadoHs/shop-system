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
            'users' => User::with('branch')->where('company_id', auth()->user()->company_id)->get(),
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

        $validated['company_id'] = auth()->user()->company_id;

        User::create($validated);

        return back();
    }


    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}",
            'role' => 'required',
            'branch_id' => 'required|exists:branches,id', // Ensure branch_id exists in the branches table
            'phone' => 'required|string|max:255',
        ]);

        $user->update($validated);

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->isActive)
            $user->update(['isActive' => false]);
        else
            $user->update(['isActive' => true]);

        return back();
    }


    public function changePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'password' => $request->password,
        ]);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}