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
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { categories = [], currentCategory = null } = usePage().props as any;

    // Just use categories from database, no hardcoded values to prevent duplicates

    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* Header with logo */}
            <SidebarHeader className="flex flex-col items-center py-4">
                <Link href={dashboard()} prefetch>
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
                                <SidebarMenuButton asChild isActive={!currentCategory}>
                                    <Link href="/admin/products">
                                        <Package className="w-4 h-4" />
                                        <span>All Products</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {categories.map((category: any) => (
                                <SidebarMenuItem key={category.id}>
                                    <SidebarMenuButton asChild isActive={currentCategory === category.name}>
                                        <Link href={`/admin/products?category=${category.name}`}>
                                            <Tag className="w-4 h-4" />
                                            <span>{category.name}</span>
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
