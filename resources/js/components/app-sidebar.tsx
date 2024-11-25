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
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc.",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
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
                },
                {
                    title: "Profile",
                    url: route("profile.edit"),
                },
                {
                    title: "Payment methods",
                    url: route("payments.index"),
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: ChartArea,
            items: [
                {
                    title: "Sales over time",
                    url: route("reports.sales"),
                },
                {
                    title: "Sales by branch",
                    url: route("reports.sales-by-branch"),
                },
                {
                    title: "Sales by product",
                    url: route('reports.sales-by-product'),
                },
                {
                    title: "Overall profit margin",
                    url: "#",
                },
                {
                    title: "Profit by product",
                    url: "#",
                },
                {
                    title: "Stock levels",
                    url: "#",
                },
                {
                    title: "Low-Stock Alerts",
                    url: "#",
                },
                {
                    title: "Dead Stock",
                    url: "#",
                },
                {
                    title: "Credit Sales Report",
                    url: "#",
                },
                {
                    title: "Accounts Receivable",
                    url: "#",
                },
                {
                    title: "Branch Sales Comparison",
                    url: "#",
                },
                {
                    title: "Branch Expenses",
                    url: "#",
                },
                {
                    title: "Seasonal Sales Trends",
                    url: "#",
                },
                {
                    title: "Sales Forecusting",
                    url: "#",
                },
                {
                    title: "Sales by seller",
                    url: "#",
                },
                {
                    title: "Operational Costs",
                    url: "#",
                },
                {
                    title: "Discounted Sales",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Point of sale",
            url: route("pos.index"),
            icon: Frame,
        },
        {
            name: "Products",
            url: route("products.index"),
            icon: PieChart,
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
        },
        {
            name: "Credit sales",
            url: route("credit-sales.index"),
            icon: HandCoins,
        },
        {
            name: "Pending orders",
            url: route("pending-orders.index"),
            icon: ListTodo,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className="max-w-full">
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
