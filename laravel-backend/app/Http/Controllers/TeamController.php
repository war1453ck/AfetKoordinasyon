<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with(['leader', 'assignedIncidents'])
            ->orderBy('name')
            ->paginate(10);

        return view('teams.index', compact('teams'));
    }

    public function show(Team $team)
    {
        $team->load(['leader', 'assignedIncidents']);
        return view('teams.show', compact('team'));
    }

    public function create()
    {
        $users = User::where('is_active', true)->get();
        return view('teams.create', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'status' => 'required|string',
            'location' => 'required|string',
            'member_count' => 'required|integer',
            'specialties' => 'required|array',
            'leader_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        Team::create($validated);

        return redirect()->route('teams.index')
            ->with('success', 'Ekip başarıyla oluşturuldu.');
    }

    public function edit(Team $team)
    {
        $users = User::where('is_active', true)->get();
        return view('teams.edit', compact('team', 'users'));
    }

    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'status' => 'required|string',
            'location' => 'required|string',
            'member_count' => 'required|integer',
            'specialties' => 'required|array',
            'leader_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $team->update($validated);

        return redirect()->route('teams.show', $team)
            ->with('success', 'Ekip güncellendi.');
    }
}