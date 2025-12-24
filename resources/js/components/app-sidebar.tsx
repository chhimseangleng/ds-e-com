import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Package, Calendar, ShoppingCart, Users, Tag, CupSoda } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'Categories',
        href: '/admin/product-categories',
        icon: Tag,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: Calendar,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    const { categories = [], events_list = [], currentCategory = null } = usePage().props as any;

    // Just use categories from database, no hardcoded values to prevent duplicates

    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* Header with logo */}
            <SidebarHeader className="flex flex-col items-center py-4">
                <Link href={dashboard().url} prefetch>
                    <AppLogo />
                </Link>
            </SidebarHeader>

            {/* Main nav */}
            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={usePage().url === '/admin/products' && (!currentCategory || currentCategory === 'All Products')}>
                                    <Link href="/admin/products">
                                        <Package className="w-4 h-4" />
                                        <span>All Products</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {categories.map((category: any) => (
                                <SidebarMenuItem key={category.id}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={currentCategory === category.name}
                                    >
                                        <Link href={`/admin/products?category=${encodeURIComponent(category.name)}`}>
                                            <Tag className="w-4 h-4" />
                                            <span>{category.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Dynamic Events</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={usePage().url === '/admin/events'}>
                                    <Link href="/admin/events">
                                        <Calendar className="w-4 h-4" />
                                        <span>All Events</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {events_list.map((event: any) => (
                                <SidebarMenuItem key={event.id}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={usePage().url === `/admin/events/${event.id}/edit`}
                                    >
                                        <Link href={`/admin/events/${event.id}/edit`}>
                                            <Calendar className="w-4 h-4" />
                                            <span>{event.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer nav */}
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
