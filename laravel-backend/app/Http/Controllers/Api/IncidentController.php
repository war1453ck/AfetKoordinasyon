<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
        $incidents = Incident::with(['reporter', 'assignedTeam'])
            ->orderBy('reported_at', 'desc')
            ->get();

        return response()->json($incidents);
    }

    public function active()
    {
        $incidents = Incident::active()
            ->with(['reporter', 'assignedTeam'])
            ->orderBy('priority', 'desc')
            ->orderBy('reported_at', 'desc')
            ->get();

        return response()->json($incidents);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'location' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $validated['reported_by'] = auth()->id();
        $validated['reported_at'] = now();
        $validated['status'] = 'active';

        $incident = Incident::create($validated);

        return response()->json($incident->load(['reporter', 'assignedTeam']), 201);
    }

    public function show(Incident $incident)
    {
        return response()->json($incident->load(['reporter', 'assignedTeam', 'assignedResources']));
    }

    public function update(Request $request, Incident $incident)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|string',
            'priority' => 'sometimes|in:low,medium,high,critical',
            'status' => 'sometimes|string',
            'location' => 'sometimes|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'assigned_team_id' => 'nullable|exists:teams,id',
            'resolution_notes' => 'nullable|string',
        ]);

        if (isset($validated['status']) && $validated['status'] === 'resolved') {
            $validated['resolved_at'] = now();
        }

        $incident->update($validated);

        return response()->json($incident->load(['reporter', 'assignedTeam', 'assignedResources']));
    }

    public function destroy(Incident $incident)
    {
        $incident->delete();
        return response()->json(['message' => 'Incident deleted successfully']);
    }
}