<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Event;
use Inertia\Inertia;
use Carbon\Carbon;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category') && $request->category !== 'All Products') {
            $query->where('category', $request->category);
        }

        $products = $query->orderBy('category')->get()->map(function ($product) {
            return [
                'id' => $product->_id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'category' => $product->category,
                'rating' => $product->rating,
                'image_path' => $product->image_path,
            ];
        });


        $today = Carbon::today()->format('Y-m-d');
        $events = Event::where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->_id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'image_path' => $event->image_path,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                ];
            });

        return Inertia::render('Products/index', [
            'products' => $products,
            'events' => $events,
            'currentCategory' => $request->query('category', 'All Products'),
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return Inertia::render('Products/show', [
            'product' => [
                'id' => $product->_id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'category' => $product->category,
                'rating' => $product->rating,
                'image_path' => $product->image_path,
            ],
        ]);
    }
}
