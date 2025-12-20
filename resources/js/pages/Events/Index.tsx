import { Head, Link } from '@inertiajs/react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GuestSidebar } from '@/components/guest-sidebar';
import {
    Calendar,
    MapPin,
    Clock,
    ChevronRight,
    Search,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image_path?: string;
}

interface Props {
    events: Event[];
}

export default function Index({ events }: Props) {
    // Note: We'll pass categories from props if we want the sidebar to be dynamic here too,
    // but for now let's keep it simple or assume it's passed if ProductController was merged.
    // Assuming simple for now to match current state.

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50/50">
                <GuestSidebar categories={[]} currentCategory="" />

                <SidebarInset className="bg-transparent flex-1">
                    <Head title="Events - Store" />

                    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
                        {/* Hero Header */}
                        <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/60 shadow-sm">
                            <div className="relative z-10 max-w-2xl space-y-4">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-widest shadow-lg shadow-blue-200">
                                    Our Community
                                </span>
                                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
                                    Discover <span className="text-blue-600 italic">Exciting</span> Events
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                    Join us for exclusive workshops, product launches, and community gatherings. There's always something happening!
                                </p>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute right-[-10%] top-[-50%] w-[60%] aspect-square rounded-full bg-blue-100/50 blur-[100px]" />
                            <div className="absolute left-[-10%] bottom-[-50%] w-[50%] aspect-square rounded-full bg-indigo-100/50 blur-[100px]" />
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {events.length === 0 ? (
                                <div className="col-span-full py-32 text-center bg-white/50 backdrop-blur-md border border-gray-100 rounded-[3rem] shadow-sm">
                                    <div className="max-w-md mx-auto space-y-6">
                                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                                            <Calendar className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-gray-900">No Upcoming Events</h3>
                                            <p className="text-gray-500 font-medium leading-relaxed">
                                                We're currently planning some amazing experiences. <br /> Check back soon for updates!
                                            </p>
                                        </div>
                                        <Button asChild variant="outline" className="rounded-2xl h-12 px-8 border-gray-200 hover:bg-gray-50 transition-all font-bold">
                                            <Link href="/">Back to Shopping</Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
                                    >
                                        {/* Image Header */}
                                        <div className="relative aspect-video overflow-hidden">
                                            {event.image_path ? (
                                                <img
                                                    src={`/storage/${event.image_path}`}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                                    <Calendar className="w-12 h-12 text-gray-200 group-hover:scale-110 group-hover:text-blue-200 transition-all duration-500" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500">
                                                <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl flex flex-col items-center min-w-[60px]">
                                                    <span className="text-[0.6rem] font-bold text-blue-600 uppercase tracking-tighter">
                                                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                                                    </span>
                                                    <span className="text-2xl font-black text-gray-900 leading-none">
                                                        {new Date(event.date).toLocaleDateString(undefined, { day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex flex-col flex-1 space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-bold border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>10:00 AM</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-bold border border-gray-100 group-hover:bg-red-50 group-hover:text-red-500 group-hover:border-red-100 transition-colors">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span>Live Session</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ring-4 ring-blue-50">
                                                        <MapPin className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700 truncate max-w-[120px]">
                                                        {event.location}
                                                    </span>
                                                </div>
                                                <Button variant="ghost" className="rounded-xl group/btn hover:bg-blue-50 p-0 w-10 h-10 flex items-center justify-center">
                                                    <ArrowUpRight className="w-5 h-5 text-blue-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
