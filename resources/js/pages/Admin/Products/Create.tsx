import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, Save, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Category {
    _id: string;
    name: string;
}

interface Props {
    categories: Category[];
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
    {
        title: 'Create',
        href: '/admin/products/create',
    },
];

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category: '',
        rating: 5,
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Create Product" />

            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" asChild className="-ml-2">
                        <Link href={'/admin/products'}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to List
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Add New Product</h1>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Enter product name"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    placeholder="0.00"
                                    className={errors.price ? 'border-red-500' : ''}
                                />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) => setData('category', value)}
                            >
                                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category._id} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label>Rating</Label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= (data.rating as number)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-4 text-lg font-medium text-gray-700">
                                    {data.rating} / 5
                                </span>
                            </div>
                            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Enter product description"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label>Product Image</Label>
                            <div className="flex items-center gap-6">
                                <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload className="w-8 h-8 text-gray-300" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    <Button type="button" variant="outline" onClick={() => document.getElementById('image')?.click()}>
                                        Choose Image
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        PNG, JPG or JPEG up to 2MB.
                                    </p>
                                </div>
                            </div>
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <Button variant="ghost" asChild>
                                <Link href={'/admin/products'}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Product
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
