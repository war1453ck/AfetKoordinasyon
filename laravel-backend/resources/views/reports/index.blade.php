@extends('layouts.app')

@section('title', 'Raporlar - Afet Koordinasyon Sistemi')
@section('page-title', 'Raporlar ve Analizler')
@section('page-subtitle', 'Sistem performansı ve istatistikler')

@section('content')
<div class="space-y-6">
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100">
                    <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Bu Ay Toplam</p>
                    <p class="text-2xl font-bold text-gray-900">47</p>
                    <p class="text-xs text-green-600">+12% önceki aya göre</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100">
                    <i class="fas fa-clock text-green-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Ortalama Müdahale</p>
                    <p class="text-2xl font-bold text-gray-900">8.5 dk</p>
                    <p class="text-xs text-green-600">-2.3 dk iyileşme</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100">
                    <i class="fas fa-percentage text-purple-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Çözüm Oranı</p>
                    <p class="text-2xl font-bold text-gray-900">94.2%</p>
                    <p class="text-xs text-green-600">+1.8% artış</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-orange-100">
                    <i class="fas fa-users text-orange-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Aktif Personel</p>
                    <p class="text-2xl font-bold text-gray-900">156</p>
                    <p class="text-xs text-blue-600">12 ekip görevde</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Incident Types Chart -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Acil Durum Türleri (Bu Ay)</h3>
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 bg-red-500 rounded"></div>
                        <span class="text-sm text-gray-700">Yangın</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-900 font-medium">18</span>
                        <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-red-500 h-2 rounded-full" style="width: 38%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 bg-blue-500 rounded"></div>
                        <span class="text-sm text-gray-700">Trafik Kazası</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-900 font-medium">15</span>
                        <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: 32%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 bg-green-500 rounded"></div>
                        <span class="text-sm text-gray-700">Tıbbi Acil</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-900 font-medium">9</span>
                        <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 19%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span class="text-sm text-gray-700">Diğer</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-900 font-medium">5</span>
                        <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-yellow-500 h-2 rounded-full" style="width: 11%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Response Time Trend -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Müdahale Süresi Trendi</h3>
            <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-chart-line text-4xl text-gray-400 mb-2"></i>
                    <p class="text-gray-500">Grafik gösterimi</p>
                    <p class="text-sm text-gray-400">Son 30 günlük müdahale süreleri</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Monthly Report Table -->
    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">Aylık Performans Raporu</h3>
                <div class="flex space-x-2">
                    <button class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                        <i class="fas fa-download mr-2"></i>PDF İndir
                    </button>
                    <button class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                        <i class="fas fa-file-excel mr-2"></i>Excel İndir
                    </button>
                </div>
            </div>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ay</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Olay</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çözülen</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ort. Müdahale</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başarı Oranı</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Haziran 2025</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">47</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">44</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8.5 dk</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                94.2%
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mayıs 2025</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">42</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">38</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.8 dk</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                90.5%
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nisan 2025</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">39</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">35</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12.1 dk</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                89.7%
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Ekip Performansı</h4>
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">İtfaiye Ekibi-1</span>
                    <span class="text-sm font-medium text-green-600">Mükemmel</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">AFAD Kurtarma</span>
                    <span class="text-sm font-medium text-green-600">Çok İyi</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Sağlık Ekibi-2</span>
                    <span class="text-sm font-medium text-yellow-600">İyi</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Kaynak Kullanımı</h4>
            <div class="space-y-3">
                <div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-700">İtfaiye Araçları</span>
                        <span class="text-gray-900">8/10</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-700">Ambulanslar</span>
                        <span class="text-gray-900">6/8</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 75%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-700">Kurtarma</span>
                        <span class="text-gray-900">4/6</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div class="bg-purple-500 h-2 rounded-full" style="width: 67%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Bölge İstatistikleri</h4>
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Beşiktaş</span>
                    <span class="text-sm font-medium text-gray-900">12 olay</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Kadıköy</span>
                    <span class="text-sm font-medium text-gray-900">9 olay</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Şişli</span>
                    <span class="text-sm font-medium text-gray-900">7 olay</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Fatih</span>
                    <span class="text-sm font-medium text-gray-900">5 olay</span>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection