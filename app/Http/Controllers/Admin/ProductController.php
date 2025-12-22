<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->get()->map(function ($product) {
                return [
                    'id' => $product->_id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'category' => $product->category,
                    'rating' => $product->rating,
                    'image_path' => $product->image_path,
                ];
            }),
            'categories' => \App\Models\ProductCategory::all()->map(function ($category) {
                return [
                    'id' => $category->_id,
                    'name' => $category->name,
                ];
            }),
            'currentCategory' => $request->query('category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => \App\Models\ProductCategory::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price', 'category', 'rating']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('ecom/products', 's3');
            $data['image_path'] = Storage::disk('s3')->url($path);
        }

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                'id' => $product->_id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'category' => $product->category,
                'rating' => $product->rating,
                'image_path' => $product->image_path,
            ],
            'categories' => \App\Models\ProductCategory::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price', 'category', 'rating']);

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                // Extract path from URL if it's a full S3 URL
                $oldPath = str_replace(Storage::disk('s3')->url(''), '', $product->image_path);
                Storage::disk('s3')->delete($oldPath);
            }
            $path = $request->file('image')->store('ecom/products', 's3');
            $data['image_path'] = Storage::disk('s3')->url($path);
        }

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->image_path) {
            // Extract path from URL if it's a full S3 URL
            $oldPath = str_replace(Storage::disk('s3')->url(''), '', $product->image_path);
            Storage::disk('s3')->delete($oldPath);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}
