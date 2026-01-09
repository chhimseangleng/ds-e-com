<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        // dd(ProductCategory::all());
        return Inertia::render('Admin/ProductCategories/Index', [
            'categories' => ProductCategory::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProductCategory::create([
            'name' => $request->name,
        ]);

        return redirect()->route('product-categories.index')->with('success', 'Category created successfully.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = ProductCategory::find($id);
        if ($category) {
            $category->update([
                'name' => $request->name,
            ]);
        }

        return redirect()->route('product-categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = ProductCategory::find($id);
        if ($category) {
            $category->delete();
        }
        return redirect()->route('product-categories.index')->with('success', 'Category deleted successfully.');
    }
}
