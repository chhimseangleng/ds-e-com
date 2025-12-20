<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::orderBy('date', 'desc')->get()->map(function ($event) {
                return [
                    'id' => $event->_id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->date,
                    'location' => $event->location,
                    'image_path' => $event->image_path,
                ];
            }),
        ]);
    }
}
