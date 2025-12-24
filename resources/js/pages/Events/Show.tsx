import { Head, Link } from '@inertiajs/react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GuestSidebar } from '@/components/guest-sidebar';
import {
    Calendar,
    MapPin,
    ArrowLeft,
    Clock,
    Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Event {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    image_path?: string;
}

interface Props {
    event: Event;
}

export default function Show({ event }: Props) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50/50">
                <GuestSidebar currentCategory="" />

                <SidebarInset className="bg-transparent flex-1">
                    <Head title={`${event.title} - Events`} />

                    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-8">
                        {/* Back Button */}
                        <Button variant="ghost" asChild className="group -ml-3 h-10 text-gray-500 hover:text-blue-600">
                            <Link href="/events">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Events
                            </Link>
                        </Button>

                        {/* Hero Image */}
                        <div className="relative aspect-[21/9] overflow-hidden rounded-[3rem] shadow-2xl border border-white/20">
                            {event.image_path ? (
                                <img
                                    src={event.image_path}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center">
                                    <Calendar className="w-24 h-24 text-white/20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute top-8 right-8">
                                <Badge className="bg-blue-600/90 backdrop-blur-md text-white border-none px-4 py-2 text-sm font-bold tracking-wider uppercase shadow-xl">
                                    Active Event
                                </Badge>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 space-y-8">
                            {/* Title & Share */}
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight flex-1">
                                    {event.title}
                                </h1>
                                <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-gray-200 hover:bg-gray-50 shrink-0">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </Button>
                            </div>

                            {/* Event Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Start Date</p>
                                        <p className="text-base font-bold text-gray-900">
                                            {new Date(event.start_date).toLocaleDateString(undefined, {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-red-50/50 rounded-2xl border border-red-100">
                                    <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider">End Date</p>
                                        <p className="text-base font-bold text-gray-900">
                                            {new Date(event.end_date).toLocaleDateString(undefined, {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-green-50/50 rounded-2xl border border-green-100">
                                    <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Location</p>
                                        <p className="text-base font-bold text-gray-900 line-clamp-2">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900">About This Event</h2>
                                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                                <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl text-base font-bold shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95">
                                    <Link href="/">Continue Shopping</Link>
                                </Button>
                                <Button asChild variant="outline" className="flex-1 h-14 rounded-2xl text-base font-bold border-gray-200 hover:bg-gray-50">
                                    <Link href="/events">View All Events</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
