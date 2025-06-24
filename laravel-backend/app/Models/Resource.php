<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'status',
        'location',
        'latitude',
        'longitude',
        'capacity',
        'equipment',
        'assigned_incident_id',
        'last_maintenance',
        'notes',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'last_maintenance' => 'datetime',
    ];

    public function assignedIncident()
    {
        return $this->belongsTo(Incident::class, 'assigned_incident_id');
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}