import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Package,
    Calendar,
    Tag,
    TrendingUp,
    Plus,
    ArrowUpRight,
    Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_path?: string;
    category?: string;
    created_at: string;
}

interface Stats {
    totalProducts: number;
    totalEvents: number;
    totalCategories: number;
    recentProducts: Product[];
}

interface Props {
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6 md:p-10 w-full space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Welcome back! Here's an overview of your store.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-md">
                            <Link href="/admin/products/create">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Products Stat */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Total Products</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.totalProducts}</h3>
                                </div>
                            </div>
                            <Link href="/admin/products" className="text-blue-600 hover:underline text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View All
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Package className="w-32 h-32" />
                        </div>
                    </div>

                    {/* Events Stat */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Total Events</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.totalEvents}</h3>
                                </div>
                            </div>
                            <Link href="/admin/events" className="text-indigo-600 hover:underline text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View All
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Calendar className="w-32 h-32" />
                        </div>
                    </div>

                    {/* Categories Stat */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                                    <Tag className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Categories</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{stats.totalCategories}</h3>
                                </div>
                            </div>
                            <Link href="/admin/product-categories" className="text-emerald-600 hover:underline text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Manage
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Tag className="w-32 h-32" />
                        </div>
                    </div>
                </div>

                {/* Recent Products Table */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Recently Added Products</h3>
                                    <p className="text-sm text-gray-500">Your latest inventory additions</p>
                                </div>
                            </div>
                            <Button variant="ghost" asChild className="text-gray-600">
                                <Link href="/admin/products" className="flex items-center gap-2">
                                    View All <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-8 py-4">Product</th>
                                        <th className="px-8 py-4">Category</th>
                                        <th className="px-8 py-4">Price</th>
                                        <th className="px-8 py-4">Added On</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats.recentProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                                        {product.image_path ? (
                                                            <img
                                                                src={product.image_path}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Search className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {product.category || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 font-bold text-gray-900">${product.price}</td>
                                            <td className="px-8 py-5 text-sm text-gray-500">
                                                {new Date(product.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {stats.recentProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-gray-400">
                                                <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                                <p>No products added recently</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
