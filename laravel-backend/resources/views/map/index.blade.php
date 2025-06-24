@extends('layouts.app')

@section('title', 'Harita Görünümü - Afet Koordinasyon Sistemi')
@section('page-title', 'Harita Görünümü')
@section('page-subtitle', 'Acil durumları harita üzerinde görüntüleyin')

@section('content')
<div class="space-y-6">
    <!-- Map Controls -->
    <div class="bg-white rounded-lg shadow p-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="show-active" checked class="h-4 w-4 text-red-600 border-gray-300 rounded">
                    <label for="show-active" class="text-sm text-gray-700">Aktif Durumlar</label>
                </div>
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="show-resolved" class="h-4 w-4 text-green-600 border-gray-300 rounded">
                    <label for="show-resolved" class="text-sm text-gray-700">Çözülen Durumlar</label>
                </div>
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="show-resources" checked class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                    <label for="show-resources" class="text-sm text-gray-700">Kaynaklar</label>
                </div>
            </div>
            
            <div class="flex items-center space-x-2">
                <button onclick="refreshMap()" class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <i class="fas fa-sync-alt mr-2"></i>Yenile
                </button>
                <button onclick="fitToMarkers()" class="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    <i class="fas fa-expand-arrows-alt mr-2"></i>Tümünü Göster
                </button>
            </div>
        </div>
    </div>

    <!-- Map Container -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div id="map" class="w-full h-96 bg-gray-200 relative">
            <!-- Map Placeholder -->
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">İstanbul Haritası</h3>
                    <p class="text-gray-500">Acil durumlar ve kaynaklar burada gösterilecek</p>
                </div>
            </div>
            
            <!-- Sample Markers -->
            <div class="absolute top-4 left-4 space-y-2">
                <div class="bg-white rounded-lg shadow p-3 min-w-0 max-w-xs">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 truncate">Beşiktaş'ta Yangın</h4>
                            <p class="text-xs text-gray-500">Yüksek öncelik - 2 saat önce</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-3 min-w-0 max-w-xs">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 truncate">Kadıköy Trafik Kazası</h4>
                            <p class="text-xs text-gray-500">Orta öncelik - 45 dakika önce</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Resource Markers -->
            <div class="absolute top-4 right-4 space-y-2">
                <div class="bg-white rounded-lg shadow p-3 min-w-0 max-w-xs">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 truncate">İtfaiye-01</h4>
                            <p class="text-xs text-gray-500">Aktif - Beşiktaş</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-3 min-w-0 max-w-xs">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 truncate">Ambulans-03</h4>
                            <p class="text-xs text-gray-500">Müsait - Kadıköy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Legend -->
    <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Harita Göstergeleri</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Incidents -->
            <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Acil Durumlar</h4>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Kritik Öncelik</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Yüksek Öncelik</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Orta Öncelik</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Düşük Öncelik</span>
                    </div>
                </div>
            </div>

            <!-- Resources -->
            <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Kaynaklar</h4>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">İtfaiye Araçları</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Ambulanslar</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Kurtarma Araçları</span>
                    </div>
                </div>
            </div>

            <!-- Status -->
            <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Durum</h4>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-sm text-gray-600">Aktif</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span class="text-sm text-gray-600">Çözülmüş</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span class="text-sm text-gray-600">Müsait Kaynak</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function refreshMap() {
    // Simulate map refresh
    console.log('Harita yenileniyor...');
    
    // Show loading state
    const mapElement = document.getElementById('map');
    mapElement.style.opacity = '0.5';
    
    setTimeout(() => {
        mapElement.style.opacity = '1';
        console.log('Harita yenilendi');
    }, 1000);
}

function fitToMarkers() {
    console.log('Tüm işaretleyiciler görünüme sığdırılıyor...');
}

// Auto refresh every 30 seconds
setInterval(refreshMap, 30000);
</script>
@endsection