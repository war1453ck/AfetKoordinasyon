<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Resource::with(['assignedIncident'])
            ->orderBy('name')
            ->paginate(10);

        return view('resources.index', compact('resources'));
    }

    public function show(Resource $resource)
    {
        $resource->load(['assignedIncident']);
        return view('resources.show', compact('resource'));
    }

    public function create()
    {
        return view('resources.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'status' => 'required|string',
            'location' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'capacity' => 'required|integer',
            'equipment' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        Resource::create($validated);

        return redirect()->route('resources.index')
            ->with('success', 'Kaynak başarıyla oluşturuldu.');
    }

    public function edit(Resource $resource)
    {
        return view('resources.edit', compact('resource'));
    }

    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'status' => 'required|string',
            'location' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'capacity' => 'required|integer',
            'equipment' => 'nullable|string',
            'assigned_incident_id' => 'nullable|exists:incidents,id',
            'notes' => 'nullable|string',
        ]);

        $resource->update($validated);

        return redirect()->route('resources.show', $resource)
            ->with('success', 'Kaynak güncellendi.');
    }
}