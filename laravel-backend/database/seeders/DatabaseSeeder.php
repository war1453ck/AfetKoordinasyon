<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Team;
use App\Models\Resource;
use App\Models\Incident;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'username' => 'admin',
            'name' => 'Sistem Yöneticisi',
            'email' => 'admin@afet.gov.tr',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'IT',
            'is_active' => true,
        ]);

        // Create operator user
        $operator = User::create([
            'username' => 'operator1',
            'name' => 'Operatör 1',
            'email' => 'operator@afet.gov.tr',
            'password' => Hash::make('password'),
            'role' => 'operator',
            'department' => 'Operations',
            'is_active' => true,
        ]);

        // Create teams
        $fireTeam = Team::create([
            'name' => 'İtfaiye Ekibi-1',
            'type' => 'fire',
            'status' => 'active',
            'location' => 'Beşiktaş İtfaiye İstasyonu',
            'member_count' => 8,
            'specialties' => ['yangın söndürme', 'kurtarma'],
            'leader_id' => $operator->id,
        ]);

        $rescueTeam = Team::create([
            'name' => 'AFAD Kurtarma Ekibi',
            'type' => 'rescue',
            'status' => 'active',
            'location' => 'AFAD Merkez',
            'member_count' => 12,
            'specialties' => ['enkaz kurtarma', 'ilk yardım'],
            'leader_id' => $operator->id,
        ]);

        // Create resources
        Resource::create([
            'name' => 'İtfaiye-01',
            'type' => 'fire_truck',
            'status' => 'active',
            'location' => 'Beşiktaş',
            'latitude' => 41.0428,
            'longitude' => 29.0044,
            'capacity' => 6,
            'equipment' => 'Su tankı, merdiven, hortum',
        ]);

        Resource::create([
            'name' => 'Ambulans-03',
            'type' => 'ambulance',
            'status' => 'active',
            'location' => 'Kadıköy',
            'latitude' => 40.9833,
            'longitude' => 29.0333,
            'capacity' => 2,
            'equipment' => 'Defibrillatör, oksijen, sedye',
        ]);

        Resource::create([
            'name' => 'Kurtarma-05',
            'type' => 'rescue_vehicle',
            'status' => 'available',
            'location' => 'Şişli',
            'latitude' => 41.0608,
            'longitude' => 28.9769,
            'capacity' => 8,
            'equipment' => 'Vinç, kesici aletler, jeneratör',
        ]);

        // Create incidents
        $incident1 = Incident::create([
            'title' => 'Beşiktaş\'ta Yangın',
            'description' => 'Eski bir binada çıkan yangın. Müdahale devam ediyor.',
            'type' => 'fire',
            'priority' => 'high',
            'status' => 'active',
            'location' => 'Beşiktaş Barbaros Bulvarı',
            'latitude' => 41.0428,
            'longitude' => 29.0044,
            'reported_by' => $operator->id,
            'assigned_team_id' => $fireTeam->id,
            'reported_at' => now()->subHours(2),
        ]);

        Incident::create([
            'title' => 'Trafik Kazası - Kadıköy',
            'description' => 'İki araç çarpıştı, yaralılar var.',
            'type' => 'traffic_accident',
            'priority' => 'medium',
            'status' => 'active',
            'location' => 'Kadıköy Moda Caddesi',
            'latitude' => 40.9833,
            'longitude' => 29.0333,
            'reported_by' => $operator->id,
            'assigned_team_id' => $rescueTeam->id,
            'reported_at' => now()->subMinutes(45),
        ]);

        Incident::create([
            'title' => 'Bina Çökmesi Riski',
            'description' => 'Eski binada çatlaklar görüldü, tahliye yapıldı.',
            'type' => 'structural',
            'priority' => 'critical',
            'status' => 'resolved',
            'location' => 'Fatih Eminönü',
            'latitude' => 41.0175,
            'longitude' => 28.9738,
            'reported_by' => $admin->id,
            'resolved_at' => now()->subDays(1),
            'resolution_notes' => 'Bina güvenli hale getirildi, sakinler geri döndü.',
            'reported_at' => now()->subDays(1)->subHours(3),
        ]);
    }
}