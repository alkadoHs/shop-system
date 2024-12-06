import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChartArea,
    ClipboardList,
    Command,
    Frame,
    GalleryVerticalEnd,
    HandCoins,
    ListTodo,
    Map,
    Package,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { BranchSwitcher } from "@/components/branch-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { title } from "process";
import { url } from "inspector";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
    const branches = usePage().props.auth.branches;

    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        branches: [...branches],
        navMain: [
            {
                title: "Main",
                url: route("dashboard"),
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: "dashboard",
                        url: route("dashboard"),
                        isActive: route().current("dashboard"),
                        isVisible: user.role == "admin",
                    },
                    {
                        title: "Seller Dasboard",
                        url: route("seller-dashboard"),
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                isVisible: user.role === "admin",
                items: [
                    {
                        title: "My Profile",
                        url: route("profile.edit"),
                    },
                    {
                        title: "Payment methods",
                        url: route("payments.index"),
                    },
                    {
                        title: "Users",
                        url: route("users.index"),
                    },
                    {
                        title: "Branches",
                        url: route("branches.index"),
                    },
                    {
                        title: "Product Companies",
                        url: route("product-companies.index"),
                    },
                    {
                        title: "Suppliers",
                        url: route('suppliers.index')
                    }
                ],
            },
            {
                title: "Reports",
                url: "#",
                icon: ChartArea,
                isVisible: user.role === "admin",
                items: [
                    {
                        title: "General sales",
                        url: route("reports.general-sales"),
                    },
                    {
                        title: "Daily sales",
                        url: route("reports.sales"),
                    },
                    {
                        title: "Sales by branch",
                        url: route("reports.sales-by-branch"),
                    },
                    {
                        title: "Sales by product",
                        url: route("reports.sales-by-product"),
                    },
                    {
                        title: "Low-Stock Alerts",
                        url: route("reports.low-stock-alerts"),
                    },
                    {
                        title: "Dead Stock",
                        url: route("reports.dead-stock"),
                    },
                    // {
                    //     title: "Credit Sales Report",
                    //     url: "#",
                    // },
                    {
                        title: "Expenses reports",
                        url: route("reports.expenses"),
                    },
                    // {
                    //     title: "Accounts Receivable",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Branch Sales Comparison",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Branch Expenses",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Seasonal Sales Trends",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Sales Forecusting",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Sales by seller",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Operational Costs",
                    //     url: "#",
                    // },
                    // {
                    //     title: "Discounted Sales",
                    //     url: "#",
                    // },
                ],
            },
        ],
        Shop: [
            {
                name: "Point of sale",
                url: route("pos.index"),
                icon: Frame,
            },
            {
                name: "Products",
                url: route("products.index"),
                icon: PieChart,
                isVisible: user.role === "admin",
            },
            {
                name: "Expenses",
                url: route("expenses.index"),
                icon: ClipboardList,
            },
            {
                name: "Stock movements",
                url: route("stock-movements.index"),
                icon: Map,
                isVisible: user.role === "admin",
            },
            {
                name: "Credit sales",
                url: route("credit-sales.index"),
                icon: HandCoins,
            },
            // {
            //     name: "Pending orders",
            //     url: route("pending-orders.index"),
            //     icon: ListTodo,
            // },
            {
                name: "Purchase orders",
                url: route("purchases.index"),
                icon: Package
            }
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props} className="max-w-full">
            <SidebarHeader>
                <BranchSwitcher branches={branches} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.Shop} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
