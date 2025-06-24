<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\TeamController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::resource('incidents', IncidentController::class);
Route::resource('resources', ResourceController::class);
Route::resource('teams', TeamController::class);

Route::get('/map', function () {
    return view('map.index');
})->name('map.index');

Route::get('/reports', function () {
    return view('reports.index');
})->name('reports.index');
