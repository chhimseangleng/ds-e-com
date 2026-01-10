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
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import {
    Home,
    Search,
    Cpu,
    Shirt,
    Book,
    Glasses,
    LayoutDashboard,
    CupSoda,
    Package,
    UtensilsCrossed,
    Armchair,
    Columns2,
    Calendar
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

interface Category {
    id: string;
    name: string;
}

interface GuestSidebarProps {
    categories?: string[] | Category[];
    currentCategory?: string;
}

export function GuestSidebar({
    categories: propsCategories,
    currentCategory = "",
}: GuestSidebarProps) {

    // ✅ USE usePage INSIDE COMPONENT
    const { auth, categories: sharedCategories = [], events_list = [] } = usePage().props as any;
    const user = auth?.user;

    const categories =
        propsCategories && propsCategories.length > 0
            ? propsCategories
            : sharedCategories;

    const iconMap: Record<string, any> = {
        Electronics: Cpu,
        Clothing: Shirt,
        Books: Book,
        Accessories: Glasses,
        Drink: CupSoda,
        Food: UtensilsCrossed,
        Table: Columns2,
        Chair: Armchair,
        default: Package,
    };

    const sideBarCategories = [
        { name: 'All Products', icon: Home },
        ...categories.map((cat: Category | string) => {
            const name = typeof cat === 'string' ? cat : cat.name;
            return {
                name,
                icon: iconMap[name] || iconMap.default,
            };
        }),
    ];

    const priceRanges = [
        'Under $25',
        '$25 - $50',
        '$50 - $100',
        '$100 - $200',
        '$200+',
    ];

    return (
        <Sidebar variant="inset" className="border-r border-gray-100 bg-white/50 backdrop-blur-xl">
            <SidebarHeader className="p-4">
                <div className="flex items-center justify-center px-2 py-2">
                    <Link href="/">
                        <img
                            src="/logo/logo.png"
                            alt="MyShop Logo"
                            className="h-32 w-auto max-w-full object-contain hover:opacity-90 transition-opacity"
                        />
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <div className="px-4 py-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all duration-300"
                        />
                    </div>
                </div>

                {/* NAVIGATION */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/" className="flex items-center">
                                        <Home className="w-4 h-4 mr-3" />
                                        Home
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={usePage().url === '/events'}>
                                    <Link href="/events" className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-3" />
                                        Events
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="my-2 mx-4" />

                {/* CATEGORIES */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2">
                            {sideBarCategories
                                .filter(c => c.name !== 'All Products')
                                .map(category => (
                                    <SidebarMenuItem key={category.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={category.name === currentCategory}
                                        >
                                            <Link
                                                href={`/?category=${encodeURIComponent(category.name)}`}
                                                className="flex items-center"
                                            >
                                                <category.icon className="w-4 h-4 mr-3" />
                                                {category.name}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ✅ ADMIN BUTTON — AUTH CHECK HERE */}
            {user && (
                <SidebarFooter className="p-4 border-t border-gray-100">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="w-full justify-center bg-gray-900 text-white hover:bg-gray-800"
                            >
                                <Link href="/dashboard" className="flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Go to Admin
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
