<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => Event::all()->map(function ($event) {
                return [
                    'id' => $event->_id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'location' => $event->location,
                    'image_path' => $event->image_path,
                ];
            })
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'title',
            'description',
            'start_date',
            'end_date',
            'location'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 's3');
            $data['image_path'] = Storage::disk('s3')->url($path);
        }

        Event::create($data);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => [
                'id' => $event->_id,
                'title' => $event->title,
                'description' => $event->description,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'location' => $event->location,
                'image_path' => $event->image_path,
            ]
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'title',
            'description',
            'start_date',
            'end_date',
            'location'
        ]);

        if ($request->hasFile('image')) {

            // 🔴 Delete old image from S3
            if ($event->image_path) {
                $path = parse_url($event->image_path, PHP_URL_PATH);
                $oldPath = ltrim($path, '/');

                if ($oldPath && Storage::disk('s3')->exists($oldPath)) {
                    Storage::disk('s3')->delete($oldPath);
                }
            }

            // 🟢 Upload new image to S3
            $path = $request->file('image')->store('events', 's3');
            $data['image_path'] = Storage::disk('s3')->url($path);
        }

        $event->update($data);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        if ($event->image_path) {
            Storage::disk('public')->delete($event->image_path);
        }
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully.');
    }
}
