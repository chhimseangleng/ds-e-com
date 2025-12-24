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
            'events' => Event::orderBy('start_date', 'desc')->get()->map(function ($event) {
                return [
                    'id' => $event->_id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'location' => $event->location,
                    'image_path' => $event->image_path,
                ];
            }),
        ]);
    }

    public function show(Event $event)
    {
        return Inertia::render('Events/Show', [
            'event' => [
                'id' => $event->_id,
                'title' => $event->title,
                'description' => $event->description,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'location' => $event->location,
                'image_path' => $event->image_path,
            ],
        ]);
    }
}
