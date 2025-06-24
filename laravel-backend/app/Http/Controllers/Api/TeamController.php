<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with(['leader', 'assignedIncidents'])
            ->orderBy('name')
            ->get();

        return response()->json($teams);
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

        $team = Team::create($validated);

        return response()->json($team->load(['leader']), 201);
    }

    public function show(Team $team)
    {
        return response()->json($team->load(['leader', 'assignedIncidents']));
    }

    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string',
            'status' => 'sometimes|string',
            'location' => 'sometimes|string',
            'member_count' => 'sometimes|integer',
            'specialties' => 'sometimes|array',
            'leader_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $team->update($validated);

        return response()->json($team->load(['leader', 'assignedIncidents']));
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return response()->json(['message' => 'Team deleted successfully']);
    }
}