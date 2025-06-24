<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Team;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
        $incidents = Incident::with(['reporter', 'assignedTeam'])
            ->orderBy('reported_at', 'desc')
            ->paginate(10);

        return view('incidents.index', compact('incidents'));
    }

    public function show(Incident $incident)
    {
        $incident->load(['reporter', 'assignedTeam', 'assignedResources']);
        return view('incidents.show', compact('incident'));
    }

    public function create()
    {
        $teams = Team::active()->get();
        return view('incidents.create', compact('teams'));
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

        $validated['reported_by'] = auth()->id() ?? 1; // Default user for demo
        $validated['reported_at'] = now();
        $validated['status'] = 'active';

        Incident::create($validated);

        return redirect()->route('incidents.index')
            ->with('success', 'Acil durum başarıyla bildirildi.');
    }

    public function edit(Incident $incident)
    {
        $teams = Team::active()->get();
        return view('incidents.edit', compact('incident', 'teams'));
    }

    public function update(Request $request, Incident $incident)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'status' => 'required|string',
            'location' => 'required|string',
            'assigned_team_id' => 'nullable|exists:teams,id',
            'resolution_notes' => 'nullable|string',
        ]);

        if ($validated['status'] === 'resolved') {
            $validated['resolved_at'] = now();
        }

        $incident->update($validated);

        return redirect()->route('incidents.show', $incident)
            ->with('success', 'Acil durum güncellendi.');
    }
}