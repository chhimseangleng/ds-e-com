<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Event;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalProducts' => Product::count(),
                'totalEvents' => Event::count(),
                'totalCategories' => ProductCategory::count(),
                'recentProducts' => Product::orderBy('created_at', 'desc')->limit(5)->get()->map(function ($product) {
                    return [
                        'id' => $product->_id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'category' => $product->category,
                        'image_path' => $product->image_path,
                        'created_at' => $product->created_at ? $product->created_at->toDateTimeString() : null,
                    ];
                }),
            ]
        ]);
    }
}
