<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'priority',
        'status',
        'location',
        'latitude',
        'longitude',
        'reported_by',
        'assigned_team_id',
        'reported_at',
        'resolved_at',
        'resolution_notes',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'reported_at' => 'datetime',
        'resolved_at' => 'datetime',
    ];

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    public function assignedTeam()
    {
        return $this->belongsTo(Team::class, 'assigned_team_id');
    }

    public function assignedResources()
    {
        return $this->hasMany(Resource::class, 'assigned_incident_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }
}