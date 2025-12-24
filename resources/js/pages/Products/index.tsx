import React from 'react';
import { Link } from '@inertiajs/react';
import {
    ShoppingCart,
    Search,
    Star,
    ChevronLeft,
    ChevronRight,
    Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GuestSidebar } from '@/components/guest-sidebar';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    category?: string;
    image_path?: string;
}

interface Category {
    id: string;
    name: string;
}

interface Event {
    id: string;
    title: string;
    description: string;
    image_path?: string;
    start_date: string;
    end_date: string;
}

interface Props {
    products: Product[];
    categories: Category[];
    events: Event[];
    currentCategory: string;
}

export default function Index({ products, categories, events, currentCategory }: Props) {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    useEffect(() => {
        if (events.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [events]);

    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50/80">
                <GuestSidebar categories={categories} currentCategory={currentCategory} />
                <SidebarInset className="bg-transparent">
                    {/* Header */}
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/50 bg-white/80 backdrop-blur-md px-4 shadow-sm">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="flex-1 flex justify-between items-center">
                            <h1 className="text-lg font-semibold text-gray-800">All Products</h1>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 p-6 md:p-8 pt-6">
                        {/* Events Banner/Carousel */}
                        {events && events.length > 0 && (
                            <div className="mb-12 relative group h-[300px] md:h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20">
                                {events.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentEventIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                    >
                                        <Link href={`/events/${event.id}`} className="block h-full w-full">
                                            {/* Background Image */}
                                            <div className="absolute inset-0">
                                                {event.image_path ? (
                                                    <img
                                                        src={event.image_path}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[10s]"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-blue-600/90 text-white border-none px-3 py-1 text-xs font-bold tracking-wider uppercase animate-bounce">
                                                        Limited Time Event
                                                    </Badge>
                                                    <span className="text-white/70 text-sm font-medium flex items-center gap-1.5 glass-effect px-3 py-1 rounded-full">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        Ends {new Date(event.end_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-2xl drop-shadow-2xl">
                                                    {event.title}
                                                </h1>
                                                <p className="text-lg md:text-xl text-white/80 max-w-xl line-clamp-2 leading-relaxed font-medium">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}

                                {/* Carousel Controls */}
                                {events.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setCurrentEventIndex((prev) => (prev + 1) % events.length)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                        <div className="absolute bottom-10 right-10 z-20 flex gap-2">
                                            {events.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-2 transition-all duration-300 rounded-full ${i === currentEventIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="space-y-12">
                            {Object.entries(groupedProducts).map(([category, items]) => (
                                <div key={category} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                                        {/* <div className="h-px flex-1 bg-gray-200/60" />
                                        <Badge variant="outline" className="bg-white text-gray-500 border-gray-200">
                                            {items.length} {items.length === 1 ? 'Product' : 'Products'}
                                        </Badge> */}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {items.map((product) => (
                                            <div
                                                key={product.id}
                                                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                                            >
                                                {/* Image Container */}
                                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                    {product.image_path ? (
                                                        <img
                                                            src={product.image_path}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <div className="flex flex-col items-center">
                                                                <Search className="w-10 h-10 mb-2" />
                                                                <span className="text-sm">No Image</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Overlay Actions */}
                                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                                        <Link href={`/products/${product.id}`} className="w-full">
                                                            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium">
                                                                Quick View
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                            {product.name}
                                                        </h2>
                                                        <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                            ${product.price}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                                        {product.description}
                                                    </p>

                                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                                        <div className="flex items-center">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    className={`w-3.5 h-3.5 ${star <= (product.rating || 0)
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                            <span className="ml-1.5 text-xs text-gray-400 font-medium">
                                                                ({Number(product.rating || 0)} Star)
                                                            </span>
                                                        </div>

                                                        <Link
                                                            href={`/products/${product.id}`}
                                                            className="inline-flex items-center justify-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
                                                        >
                                                            Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
