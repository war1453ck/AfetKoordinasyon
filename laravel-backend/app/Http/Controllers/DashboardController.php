<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Resource;
use App\Models\Team;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'activeEmergencies' => Incident::active()->count(),
            'activeResources' => Resource::available()->count(),
            'activeTeams' => Team::active()->count(),
            'responseTime' => '8.5 dk',
        ];

        $activeIncidents = Incident::active()
            ->with(['reporter', 'assignedTeam'])
            ->orderBy('priority', 'desc')
            ->orderBy('reported_at', 'desc')
            ->limit(5)
            ->get();

        $recentActivity = [
            [
                'icon' => 'fire',
                'message' => 'Beşiktaş\'ta yangın müdahalesi başladı',
                'time' => '2 saat önce'
            ],
            [
                'icon' => 'ambulance',
                'message' => 'Kadıköy\'de trafik kazası - Ambulans yollandı',
                'time' => '45 dakika önce'
            ],
            [
                'icon' => 'check-circle',
                'message' => 'Fatih\'teki bina çökmesi riski giderildi',
                'time' => '1 gün önce'
            ],
            [
                'icon' => 'users',
                'message' => 'Yeni kurtarma ekibi göreve başladı',
                'time' => '2 gün önce'
            ],
        ];

        return view('dashboard', compact('stats', 'activeIncidents', 'recentActivity'));
    }
}