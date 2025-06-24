<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'status',
        'location',
        'member_count',
        'specialties',
        'leader_id',
        'last_deployment',
        'notes',
    ];

    protected $casts = [
        'specialties' => 'array',
        'last_deployment' => 'datetime',
    ];

    public function leader()
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

    public function assignedIncidents()
    {
        return $this->hasMany(Incident::class, 'assigned_team_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}