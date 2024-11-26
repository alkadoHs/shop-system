import {
    Cloud,
    DownloadCloud,
    Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BranchSalesExport({ exportType }: { exportType: string }) {
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
                            href={route("reports.sales-by-branch.export.pdf", {
                                reportType: exportType ?? "monthly",
                            })}
                        >
                            <Printer className="size-4" />
                            <span>PDF</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                            href={route("reports.sales-by-branch.export.excel", {
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
