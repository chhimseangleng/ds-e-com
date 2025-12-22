import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Package, Tag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_path?: string;
    category?: string;
    rating?: number;
}

interface Props {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/admin/products',
    },
];

export default function Index({ products }: Props) {
    const deleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Products" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500">Manage your store products</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" asChild className="flex items-center gap-2">
                            <Link href="/admin/product-categories">
                                <Tag className="w-4 h-4" />
                                Category
                            </Link>
                        </Button>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href={'/admin/products/create'}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Image</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <Package className="w-12 h-12 mb-2 opacity-20" />
                                            <span>No products found. Start by adding one!</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center">
                                                {product.image_path ? (
                                                    <img
                                                        src={product.image_path}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                                                        <Package className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">{product.rating || 0}</span>
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm font-semibold">${product.price}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">{product.description}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
