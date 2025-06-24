<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Resource::with(['assignedIncident'])
            ->orderBy('name')
            ->get();

        return response()->json($resources);
    }

    public function stats()
    {
        $fire = Resource::byType('fire_truck');
        $ambulance = Resource::byType('ambulance');
        $rescue = Resource::byType('rescue_vehicle');

        return response()->json([
            'fire' => [
                'total' => $fire->count(),
                'active' => $fire->available()->count(),
            ],
            'ambulance' => [
                'total' => $ambulance->count(),
                'active' => $ambulance->available()->count(),
            ],
            'rescue' => [
                'total' => $rescue->count(),
                'active' => $rescue->available()->count(),
            ],
        ]);
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

        $resource = Resource::create($validated);

        return response()->json($resource, 201);
    }

    public function show(Resource $resource)
    {
        return response()->json($resource->load(['assignedIncident']));
    }

    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string',
            'status' => 'sometimes|string',
            'location' => 'sometimes|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'capacity' => 'sometimes|integer',
            'equipment' => 'nullable|string',
            'assigned_incident_id' => 'nullable|exists:incidents,id',
            'notes' => 'nullable|string',
        ]);

        $resource->update($validated);

        return response()->json($resource->load(['assignedIncident']));
    }

    public function destroy(Resource $resource)
    {
        $resource->delete();
        return response()->json(['message' => 'Resource deleted successfully']);
    }
}