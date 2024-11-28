import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { AlignJustifyIcon, Building2 } from "lucide-react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="max-w-full">
                    <header className="grid h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mb-2 mt-1">
                        <div className="flex items-center justify-end  w-full gap-2 px-4 ">
                            <div className="flex items-center gap-2 mr-auto">
                                <span className="-ml-1 rounded-full p-3 border bg-white">

                                <AlignJustifyIcon className="size-4" />
                                </span>
                                <img className="h-10 w-fit rounded-full" loading={'lazy'} src={'/images/logo_text.png'} alt="logo 2" />
                            </div>
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            {header}

                            <ModeToggle />
                        </div>
                        <div className="py-1 px-6 bg-indigo-200 dark:bg-indigo-950 dark:text-white font-semibold flex items-center gap-2">
                            <Building2 className="size-4 " />{" "}
                            <span className="text-primary dark:text-orange-400">
                                {user.branch?.name}
                            </span>
                        </div>
                    </header>
                    <div className="pt-4 pb-10">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
