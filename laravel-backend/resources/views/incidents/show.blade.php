@extends('layouts.app')

@section('title', $incident->title . ' - Acil Durum Detayı')
@section('page-title', $incident->title)
@section('page-subtitle', 'Acil durum detayları ve müdahale bilgileri')

@section('content')
<div class="space-y-6">
    <!-- Back Button -->
    <div>
        <a href="{{ route('incidents.index') }}" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <i class="fas fa-arrow-left mr-2"></i>
            Acil Durumlar Listesine Dön
        </a>
    </div>

    <!-- Incident Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Details -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Basic Info -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Genel Bilgiler</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Durum</label>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                            @if($incident->status === 'active') bg-green-100 text-green-800
                            @elseif($incident->status === 'resolved') bg-gray-100 text-gray-800
                            @else bg-yellow-100 text-yellow-800 @endif">
                            {{ ucfirst($incident->status) }}
                        </span>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Öncelik</label>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                            @if($incident->priority === 'critical') bg-red-100 text-red-800
                            @elseif($incident->priority === 'high') bg-orange-100 text-orange-800
                            @elseif($incident->priority === 'medium') bg-yellow-100 text-yellow-800
                            @else bg-green-100 text-green-800 @endif">
                            {{ ucfirst($incident->priority) }}
                        </span>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Tür</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->type }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Bildirim Zamanı</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->reported_at->format('d.m.Y H:i') }}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-500">Açıklama</label>
                    <p class="mt-1 text-sm text-gray-900">{{ $incident->description }}</p>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-500">Konum</label>
                    <p class="mt-1 text-sm text-gray-900">{{ $incident->location }}</p>
                </div>
            </div>

            <!-- Assignment Info -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Atama Bilgileri</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Rapor Eden</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->reporter->name ?? 'Bilinmiyor' }}</p>
                    </div>
                    
                    @if($incident->assignedTeam)
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Atanan Ekip</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->assignedTeam->name }}</p>
                    </div>
                    @endif
                    
                    @if($incident->assignedResources->count() > 0)
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Atanan Kaynaklar</label>
                        <div class="mt-1 space-y-1">
                            @foreach($incident->assignedResources as $resource)
                            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {{ $resource->name }}
                            </span>
                            @endforeach
                        </div>
                    </div>
                    @endif
                </div>
            </div>

            @if($incident->status === 'resolved' && $incident->resolution_notes)
            <!-- Resolution -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Çözüm Bilgileri</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Çözülme Zamanı</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->resolved_at->format('d.m.Y H:i') }}</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-500">Çözüm Notları</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $incident->resolution_notes }}</p>
                    </div>
                </div>
            </div>
            @endif
        </div>

        <!-- Actions Panel -->
        <div class="space-y-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                
                <div class="space-y-3">
                    <a href="{{ route('incidents.edit', $incident) }}" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        <i class="fas fa-edit mr-2"></i>
                        Düzenle
                    </a>
                    
                    @if($incident->status === 'active')
                    <form action="{{ route('incidents.update', $incident) }}" method="POST" class="w-full">
                        @csrf
                        @method('PUT')
                        <input type="hidden" name="status" value="resolved">
                        <button type="submit" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            <i class="fas fa-check mr-2"></i>
                            Çözümlendi Olarak İşaretle
                        </button>
                    </form>
                    @endif
                    
                    <button onclick="printIncident()" class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <i class="fas fa-print mr-2"></i>
                        Yazdır
                    </button>
                </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Zaman Çizelgesi</h3>
                
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-exclamation-triangle text-red-600 text-sm"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">Acil durum bildirildi</p>
                            <p class="text-xs text-gray-500">{{ $incident->reported_at->format('d.m.Y H:i') }}</p>
                        </div>
                    </div>
                    
                    @if($incident->assignedTeam)
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-users text-blue-600 text-sm"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">Ekip atandı</p>
                            <p class="text-xs text-gray-500">{{ $incident->assignedTeam->name }}</p>
                        </div>
                    </div>
                    @endif
                    
                    @if($incident->status === 'resolved')
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-check text-green-600 text-sm"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">Acil durum çözüldü</p>
                            <p class="text-xs text-gray-500">{{ $incident->resolved_at->format('d.m.Y H:i') }}</p>
                        </div>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Map Location -->
            @if($incident->latitude && $incident->longitude)
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Konum</h3>
                <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div class="text-center">
                        <i class="fas fa-map-marker-alt text-3xl text-red-500 mb-2"></i>
                        <p class="text-sm text-gray-600">{{ $incident->location }}</p>
                        <p class="text-xs text-gray-400">{{ $incident->latitude }}, {{ $incident->longitude }}</p>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

<script>
function printIncident() {
    window.print();
}
</script>
@endsection