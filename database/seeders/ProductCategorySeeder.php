<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics'],
            ['name' => 'Clothing'],
            ['name' => 'Food & Beverages'],
            ['name' => 'Home & Garden'],
            ['name' => 'Sports & Outdoors'],
            ['name' => 'Books & Media'],
            ['name' => 'Beauty & Personal Care'],
            ['name' => 'Toys & Games'],
            ['name' => 'Automotive'],
            ['name' => 'Health & Wellness'],
        ];

        foreach ($categories as $category) {
            ProductCategory::updateOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
