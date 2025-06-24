@extends('layouts.app')

@section('title', 'Yeni Acil Durum - Afet Koordinasyon Sistemi')
@section('page-title', 'Yeni Acil Durum')
@section('page-subtitle', 'Acil durum bildirimi oluşturun')

@section('content')
<div class="max-w-2xl mx-auto">
    <!-- Back Button -->
    <div class="mb-6">
        <a href="{{ route('incidents.index') }}" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <i class="fas fa-arrow-left mr-2"></i>
            Acil Durumlar Listesine Dön
        </a>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Acil Durum Bildir</h3>
        </div>
        
        <form action="{{ route('incidents.store') }}" method="POST" class="p-6 space-y-6">
            @csrf
            
            <!-- Title -->
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Başlık *</label>
                <input type="text" name="title" id="title" required 
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                       value="{{ old('title') }}">
                @error('title')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Açıklama *</label>
                <textarea name="description" id="description" rows="4" required
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500">{{ old('description') }}</textarea>
                @error('description')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Type and Priority -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700">Tür *</label>
                    <select name="type" id="type" required 
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500">
                        <option value="">Seçiniz</option>
                        <option value="fire" {{ old('type') == 'fire' ? 'selected' : '' }}>Yangın</option>
                        <option value="medical" {{ old('type') == 'medical' ? 'selected' : '' }}>Tıbbi Acil Durum</option>
                        <option value="traffic_accident" {{ old('type') == 'traffic_accident' ? 'selected' : '' }}>Trafik Kazası</option>
                        <option value="natural_disaster" {{ old('type') == 'natural_disaster' ? 'selected' : '' }}>Doğal Afet</option>
                        <option value="structural" {{ old('type') == 'structural' ? 'selected' : '' }}>Yapısal Hasar</option>
                        <option value="other" {{ old('type') == 'other' ? 'selected' : '' }}>Diğer</option>
                    </select>
                    @error('type')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="priority" class="block text-sm font-medium text-gray-700">Öncelik *</label>
                    <select name="priority" id="priority" required 
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500">
                        <option value="">Seçiniz</option>
                        <option value="low" {{ old('priority') == 'low' ? 'selected' : '' }}>Düşük</option>
                        <option value="medium" {{ old('priority') == 'medium' ? 'selected' : '' }}>Orta</option>
                        <option value="high" {{ old('priority') == 'high' ? 'selected' : '' }}>Yüksek</option>
                        <option value="critical" {{ old('priority') == 'critical' ? 'selected' : '' }}>Kritik</option>
                    </select>
                    @error('priority')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <!-- Location -->
            <div>
                <label for="location" class="block text-sm font-medium text-gray-700">Konum *</label>
                <input type="text" name="location" id="location" required 
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                       value="{{ old('location') }}"
                       placeholder="Örn: Beşiktaş Barbaros Bulvarı No:15">
                @error('location')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Coordinates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="latitude" class="block text-sm font-medium text-gray-700">Enlem (Latitude)</label>
                    <input type="number" step="any" name="latitude" id="latitude" 
                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                           value="{{ old('latitude') }}"
                           placeholder="41.0428">
                    @error('latitude')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="longitude" class="block text-sm font-medium text-gray-700">Boylam (Longitude)</label>
                    <input type="number" step="any" name="longitude" id="longitude" 
                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                           value="{{ old('longitude') }}"
                           placeholder="29.0044">
                    @error('longitude')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('incidents.index') }}" 
                   class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    İptal
                </a>
                <button type="submit" 
                        class="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">
                    <i class="fas fa-plus mr-2"></i>
                    Acil Durum Bildir
                </button>
            </div>
        </form>
    </div>
</div>

<script>
// Get current location if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
        document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
    });
}
</script>
@endsection