<?php

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\IncidentController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes (for development)
Route::prefix('api')->group(function () {
    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    
    // Incidents
    Route::get('/incidents', [IncidentController::class, 'index']);
    Route::get('/incidents/active', [IncidentController::class, 'active']);
    Route::post('/incidents', [IncidentController::class, 'store']);
    Route::get('/incidents/{incident}', [IncidentController::class, 'show']);
    Route::put('/incidents/{incident}', [IncidentController::class, 'update']);
    Route::delete('/incidents/{incident}', [IncidentController::class, 'destroy']);
    
    // Resources
    Route::get('/resources', [ResourceController::class, 'index']);
    Route::get('/resources/stats', [ResourceController::class, 'stats']);
    Route::post('/resources', [ResourceController::class, 'store']);
    Route::get('/resources/{resource}', [ResourceController::class, 'show']);
    Route::put('/resources/{resource}', [ResourceController::class, 'update']);
    Route::delete('/resources/{resource}', [ResourceController::class, 'destroy']);
    
    // Teams
    Route::get('/teams', [TeamController::class, 'index']);
    Route::post('/teams', [TeamController::class, 'store']);
    Route::get('/teams/{team}', [TeamController::class, 'show']);
    Route::put('/teams/{team}', [TeamController::class, 'update']);
    Route::delete('/teams/{team}', [TeamController::class, 'destroy']);
});

// Protected API routes (future implementation)
Route::middleware('auth:sanctum')->prefix('api')->group(function () {
    // Protected routes will be added here
});