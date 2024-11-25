import {
    AnchorIcon,
    Cloud,
    CreditCard,
    Download,
    DownloadCloud,
    Printer,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router } from "@inertiajs/react";

export function SalesExport({ exportType }: { exportType: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <DownloadCloud className="size-4 mr-1" />
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose option</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <a
                            href={route("reports.sales.export.pdf", {
                                reportType: exportType ?? "monthly",
                            })}
                        >
                            <Printer className="size-4" />
                            <span>PDF</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                            href={route("reports.sales.export.excel", {
                                reportType: exportType ?? "monthly",
                            })}
                        >
                            <Cloud className="size-4" />
                            <span>Excel</span>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
