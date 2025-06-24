<header class="fixed top-0 right-0 left-64 z-40 bg-white border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-6">
        <!-- Page Title -->
        <div>
            <h1 class="text-xl font-semibold text-gray-900">@yield('page-title', 'Dashboard')</h1>
            <p class="text-sm text-gray-500">@yield('page-subtitle', 'Afet Koordinasyon Sistemi')</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
            <!-- Emergency Report Button -->
            <button onclick="openEmergencyModal()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <i class="fas fa-plus-circle mr-2"></i>
                Acil Durum Bildir
            </button>

            <!-- Notifications -->
            <div class="relative">
                <button class="p-2 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-bell text-lg"></i>
                    @if(($notifications ?? 0) > 0)
                        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ $notifications }}</span>
                    @endif
                </button>
            </div>

            <!-- User Menu -->
            <div class="flex items-center space-x-3">
                <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">{{ auth()->user()->name ?? 'Admin' }}</div>
                    <div class="text-xs text-gray-500">{{ auth()->user()->role ?? 'Yönetici' }}</div>
                </div>
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-gray-600"></i>
                </div>
            </div>
        </div>
    </div>
</header>