<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Incident;
use App\Models\Resource;
use App\Models\Team;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $activeIncidents = Incident::active()->count();
        $availableResources = Resource::available()->count();
        $activeTeams = Team::active()->count();
        $totalResources = Resource::count();

        return response()->json([
            'activeEmergencies' => $activeIncidents,
            'activeResources' => $availableResources,
            'totalResources' => $totalResources,
            'activeTeams' => $activeTeams,
            'responseTime' => '8.5 dk',
            'resolved24h' => Incident::where('resolved_at', '>=', now()->subDay())->count(),
        ]);
    }
}