@extends('layouts.app')

@section('title', 'Ana Dashboard - Afet Koordinasyon Sistemi')
@section('page-title', 'Ana Dashboard')
@section('page-subtitle', 'Anlık durum özeti ve kritik bilgiler')

@section('content')
<div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-red-100">
                    <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Aktif Acil Durumlar</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['activeEmergencies'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100">
                    <i class="fas fa-truck text-green-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Hazır Kaynaklar</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['activeResources'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100">
                    <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Aktif Ekipler</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['activeTeams'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100">
                    <i class="fas fa-clock text-purple-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Ortalama Müdahale</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['responseTime'] ?? '8.5 dk' }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Active Incidents and Map -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Active Incidents -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Aktif Acil Durumlar</h3>
            </div>
            <div class="divide-y divide-gray-200">
                @forelse($activeIncidents as $incident)
                <div class="p-6 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    @if($incident->priority === 'critical') bg-red-100 text-red-800
                                    @elseif($incident->priority === 'high') bg-orange-100 text-orange-800
                                    @elseif($incident->priority === 'medium') bg-yellow-100 text-yellow-800
                                    @else bg-green-100 text-green-800 @endif">
                                    {{ ucfirst($incident->priority) }}
                                </span>
                                <span class="text-sm text-gray-500">{{ $incident->reported_at->diffForHumans() }}</span>
                            </div>
                            <h4 class="mt-2 text-sm font-medium text-gray-900">{{ $incident->title }}</h4>
                            <p class="mt-1 text-sm text-gray-500">{{ $incident->location }}</p>
                        </div>
                        <div class="ml-4">
                            <a href="{{ route('incidents.show', $incident) }}" class="text-indigo-600 hover:text-indigo-900">
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                @empty
                <div class="p-6 text-center text-gray-500">
                    <i class="fas fa-check-circle text-4xl text-green-500 mb-4"></i>
                    <p>Şu anda aktif acil durum bulunmuyor.</p>
                </div>
                @endforelse
            </div>
            @if($activeIncidents->count() > 0)
            <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <a href="{{ route('incidents.index') }}" class="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                    Tümünü görüntüle <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
            @endif
        </div>

        <!-- Map View -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Harita Görünümü</h3>
            </div>
            <div class="p-6">
                <div id="map" class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div class="text-center">
                        <i class="fas fa-map-marked-alt text-4xl text-gray-400 mb-2"></i>
                        <p class="text-gray-500">İstanbul Haritası</p>
                        <p class="text-sm text-gray-400">{{ $activeIncidents->count() }} aktif olay</p>
                    </div>
                </div>
                <div class="mt-4">
                    <a href="{{ route('map.index') }}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <i class="fas fa-expand-arrows-alt mr-2"></i>
                        Tam Ekran Harita
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
        </div>
        <div class="divide-y divide-gray-200">
            @foreach($recentActivity as $activity)
            <div class="p-6">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fas fa-{{ $activity['icon'] }} text-gray-500 text-sm"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-900">{{ $activity['message'] }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ $activity['time'] }}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>

<!-- Emergency Report Modal -->
<div id="emergencyModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Acil Durum Bildir</h3>
                <button onclick="closeEmergencyModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form action="{{ route('incidents.store') }}" method="POST">
                @csrf
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Başlık</label>
                        <input type="text" name="title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Açıklama</label>
                        <textarea name="description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tür</label>
                        <select name="type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                            <option value="fire">Yangın</option>
                            <option value="medical">Tıbbi Acil Durum</option>
                            <option value="traffic_accident">Trafik Kazası</option>
                            <option value="natural_disaster">Doğal Afet</option>
                            <option value="other">Diğer</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Öncelik</label>
                        <select name="priority" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek</option>
                            <option value="critical">Kritik</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Konum</label>
                        <input type="text" name="location" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" onclick="closeEmergencyModal()" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        İptal
                    </button>
                    <button type="submit" class="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">
                        Bildir
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function openEmergencyModal() {
    document.getElementById('emergencyModal').classList.remove('hidden');
}

function closeEmergencyModal() {
    document.getElementById('emergencyModal').classList.add('hidden');
}
</script>
@endsection