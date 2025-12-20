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
import { Link } from '@inertiajs/react';

interface GuestSidebarProps {
    categories: string[];
    currentCategory: string;
}

export function GuestSidebar({ categories, currentCategory }: GuestSidebarProps) {
    const iconMap: Record<string, any> = {
        'Electronics': Cpu,
        'Clothing': Shirt,
        'Books': Book,
        'Accessories': Glasses,
        'Drink': CupSoda,
        'Food': UtensilsCrossed,
        'Table': Columns2,
        'Chair': Armchair,
        'default': Package
    };

    const sideBarCategories = [
        { name: 'All Products', icon: Home },
        ...categories.map(cat => ({
            name: cat,
            icon: iconMap[cat] || iconMap.default
        }))
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

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <Link href="/" className="w-full flex items-center">
                                        <Home className="w-4 h-4 mr-3" />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <Link href="/events" className="w-full flex items-center">
                                        <Calendar className="w-4 h-4 mr-3" />
                                        <span>Events</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="my-2 mx-4 bg-gray-100" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2">
                            {sideBarCategories.map((category) => (
                                category.name !== 'All Products' && (
                                    <SidebarMenuItem key={category.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={category.name === currentCategory}
                                            className="rounded-lg px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-semibold"
                                        >
                                            <Link
                                                href={`/?category=${category.name}`}
                                                className="w-full flex items-center"
                                            >
                                                <category.icon className="w-4 h-4 mr-3" />
                                                <span>{category.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="my-2 mx-4 bg-gray-100" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                        Price Range
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2 space-y-1">
                            {priceRanges.map((range) => (
                                <SidebarMenuItem key={range}>
                                    <SidebarMenuButton className="rounded-lg px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center w-full">
                                            <div className="w-4 h-4 rounded border border-gray-300 mr-3 mt-0.5" />
                                            <span>{range}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-100">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="w-full justify-center bg-gray-900 text-white hover:bg-gray-800 hover:text-white transition-colors shadow-md">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Go to Admin</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
