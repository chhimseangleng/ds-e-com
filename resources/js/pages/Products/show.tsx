import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Show({ product }) {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 -ml-2 hover:bg-white">
                    <Link href="/">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Shopping
                    </Link>
                </Button>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 p-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                            {product.image_path ? (
                                <img
                                    src={`/storage/${product.image_path}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <span className="text-xl font-medium">No Image Available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-5 h-5 ${star <= (product.rating || 0)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-500">
                                    ({Number(product.rating || 0).toFixed(1)} / 5.0)
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-8">${product.price}</div>
                            <div className="prose prose-sm text-gray-600 leading-relaxed mb-8">
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
