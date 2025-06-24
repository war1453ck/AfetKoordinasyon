<aside class="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50">
    <!-- Simple Header -->
    <div class="h-16 flex items-center px-4 border-b border-gray-200">
        <div class="bg-red-500 p-2 rounded-lg">
            <i class="fas fa-shield-alt text-white text-lg"></i>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <a href="{{ route('dashboard') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('dashboard') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-tachometer-alt w-4 h-4 mr-3"></i>
            Ana Dashboard
        </a>

        <a href="{{ route('incidents.index') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('incidents.*') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-exclamation-triangle w-4 h-4 mr-3"></i>
            Acil Durumlar
            @if($activeIncidents ?? 0 > 0)
                <span class="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{{ $activeIncidents }}</span>
            @endif
        </a>

        <a href="{{ route('resources.index') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('resources.*') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-truck w-4 h-4 mr-3"></i>
            Kaynaklar
        </a>

        <a href="{{ route('teams.index') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('teams.*') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-users w-4 h-4 mr-3"></i>
            Ekipler
        </a>

        <a href="{{ route('map.index') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('map.*') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-map-marked-alt w-4 h-4 mr-3"></i>
            Harita Görünümü
        </a>

        <a href="{{ route('reports.index') }}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {{ request()->routeIs('reports.*') ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100' }}">
            <i class="fas fa-chart-bar w-4 h-4 mr-3"></i>
            Raporlar
        </a>
    </nav>

    <!-- Footer -->
    <div class="p-3 border-t border-gray-200 space-y-2">
        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
            <i class="fas fa-cog w-4 h-4 mr-3"></i>
            Ayarlar
        </a>
        
        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50">
            <i class="fas fa-sign-out-alt w-4 h-4 mr-3"></i>
            Çıkış Yap
        </a>
    </div>
</aside>