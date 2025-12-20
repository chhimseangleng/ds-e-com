<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;


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
        $categories = \App\Models\ProductCategory::all()->pluck('name')->filter()->values()->toArray();

        return Inertia::render('Products/index', [
            'products' => $products,
            'categories' => $categories,
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
