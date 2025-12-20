<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ProductCategory extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'product_categories';

    protected $fillable = [
        'name',
    ];
}
