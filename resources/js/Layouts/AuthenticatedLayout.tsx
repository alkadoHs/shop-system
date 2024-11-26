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
                    <header className="flex bg-muted h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center justify-end  w-full gap-2 px-4">
                            <SidebarTrigger className="-ml-1 mr-auto" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            {header}

                            <ModeToggle />
                        </div>
                    </header>
                    <div className="pt-4 pb-10">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
