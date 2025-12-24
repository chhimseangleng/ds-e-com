import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload, Calendar, MapPin, AlignLeft, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Events',
        href: '/admin/events',
    },
    {
        title: 'Create',
        href: '/admin/events/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events');
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
            <Head title="Admin - Create Event" />

            <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <Button variant="ghost" asChild className="-ml-3 h-8 text-gray-500 hover:text-blue-600">
                            <Link href={'/admin/events'}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Events
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Event</h1>
                        <p className="text-gray-500">Fill in the details below to organize a new event.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                        {/* Title Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-4 space-y-1">
                                <Label htmlFor="title" className="text-base font-bold text-gray-900">Event Title</Label>
                                <p className="text-sm text-gray-500">Give your event a clear and catchy name.</p>
                            </div>
                            <div className="lg:col-span-8 flex items-center gap-3 bg-gray-50/50 rounded-2xl px-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                <Type className="w-5 h-5 text-gray-400" />
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g., Summer Music Festival 2024"
                                    className="border-none bg-transparent h-14 focus-visible:ring-0 text-gray-900"
                                />
                            </div>
                            {errors.title && <p className="lg:col-start-5 lg:col-span-8 text-sm text-red-500 px-1">{errors.title}</p>}
                        </div>

                        {/* Date & Location Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="start_date" className="text-base font-bold text-gray-900">Start Date</Label>
                                    <p className="text-sm text-gray-500">When does it start?</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50/50 rounded-2xl px-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="border-none bg-transparent h-14 focus-visible:ring-0"
                                    />
                                </div>
                                {errors.start_date && <p className="text-sm text-red-500 px-1">{errors.start_date}</p>}
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="end_date" className="text-base font-bold text-gray-900">End Date</Label>
                                    <p className="text-sm text-gray-500">When does it end?</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50/50 rounded-2xl px-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="border-none bg-transparent h-14 focus-visible:ring-0"
                                    />
                                </div>
                                {errors.end_date && <p className="text-sm text-red-500 px-1">{errors.end_date}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="location" className="text-base font-bold text-gray-900">Location</Label>
                                    <p className="text-sm text-gray-500">Where is the venue?</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50/50 rounded-2xl px-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="e.g., Grand Ballroom, Hotel XYZ"
                                        className="border-none bg-transparent h-14 focus-visible:ring-0"
                                    />
                                </div>
                                {errors.location && <p className="text-sm text-red-500 px-1">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-4 space-y-1">
                                <Label htmlFor="description" className="text-base font-bold text-gray-900">Description</Label>
                                <p className="text-sm text-gray-500">Tell us what's happening!</p>
                            </div>
                            <div className="lg:col-span-8 flex items-start gap-3 bg-gray-50/50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                <AlignLeft className="w-5 h-5 text-gray-400 mt-2" />
                                <textarea
                                    id="description"
                                    className="flex min-h-[160px] w-full bg-transparent border-none text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 leading-relaxed"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Enter event details, schedule, highlights..."
                                />
                            </div>
                            {errors.description && <p className="lg:col-start-5 lg:col-span-8 text-sm text-red-500 px-1">{errors.description}</p>}
                        </div>

                        {/* Image Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-4 space-y-1">
                                <Label className="text-base font-bold text-gray-900">Event Poster</Label>
                                <p className="text-sm text-gray-500">A picture worth a thousand words.</p>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative group w-full md:w-64 aspect-video md:aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:border-blue-400 group">
                                        {preview ? (
                                            <>
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button type="button" variant="ghost" className="text-white" onClick={() => document.getElementById('image')?.click()}>
                                                        Change Photo
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-blue-500 transition-colors">
                                                <div className="p-4 bg-white rounded-2xl shadow-sm">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <span className="text-sm font-medium">Click to upload</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="image"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <h4 className="font-bold text-gray-900">Upload Guidelines</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            High-quality landscape images work best for posters. <br />
                                            Supported: PNG, JPG, JPEG (Max 2MB)
                                        </p>
                                        <Button type="button" variant="outline" className="rounded-xl mt-4" onClick={() => document.getElementById('image')?.click()}>
                                            Select File
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {errors.image && <p className="lg:col-start-5 lg:col-span-8 text-sm text-red-500 px-1">{errors.image}</p>}
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-end gap-4">
                            <Button variant="ghost" asChild className="rounded-2xl h-14 px-8 order-2 md:order-1">
                                <Link href={'/admin/events'}>Cancel</Link>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-14 px-10 shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95 text-base font-bold order-1 md:order-2"
                            >
                                <Save className="w-5 h-5 mr-3" />
                                Publish Event
                            </Button>
                        </div>
                    </form>

                    {/* Background Decorative Pattern */}
                    <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none rotate-12">
                        <Calendar className="w-80 h-80" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
