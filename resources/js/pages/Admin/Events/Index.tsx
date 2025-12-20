import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Calendar, MapPin, ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Event {
    id: string; // Standardized to id
    title: string;
    description: string;
    date: string;
    location: string;
    image_path?: string;
}

interface Props {
    events: Event[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Events',
        href: '/admin/events',
    },
];

export default function Index({ events }: Props) {
    const deleteEvent = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/admin/events/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Events" />

            <div className="p-6 md:p-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Events</h1>
                        <p className="text-gray-500">Create and manage your upcoming store events.</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 h-11 px-6 shadow-md transition-all hover:scale-105 active:scale-95">
                        <Link href={'/admin/events/create'}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Event
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-8 py-5">Event Details</th>
                                    <th className="px-8 py-5">Date & Time</th>
                                    <th className="px-8 py-5">Location</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-32 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <div className="p-4 bg-gray-50 rounded-full mb-4">
                                                    <Calendar className="w-12 h-12 opacity-20" />
                                                </div>
                                                <span className="text-lg font-medium text-gray-900">No events found</span>
                                                <p className="text-sm">Start by adding your first event!</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                                        {event.image_path ? (
                                                            <img
                                                                src={`/storage/${event.image_path}`}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Calendar className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                                                        <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{event.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Calendar className="w-4 h-4 text-blue-500" />
                                                    {new Date(event.date).toLocaleDateString(undefined, {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <MapPin className="w-4 h-4 text-red-400" />
                                                    {event.location}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild className="rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <Link href={`/admin/events/${event.id}/edit`}>
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => deleteEvent(event.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
