import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    branchSalesColumns,
    SalesByBranch,
} from "./columns";
import { DataTable } from "@/components/data-table";
import { dateFormat, numberFormat } from "@/lib/utils";
import { TableCell } from "@/components/ui/table";
import BranchSalesFilter from "./filters/BranchSalesFilter";
import { BranchSalesExport } from "./filters/BranchSalesExport";

const SalesOverTimePage = ({
    salesByBranch,
    reportType,
    startDate,
    endDate,
}: {
    salesByBranch: SalesByBranch[];
    reportType: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated>
            <Head title="Sales Over Time" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Sales by Branch</H3>
                </div>

                <div>
                    {reportType != "daily" && (
                        <div className="text-sm text-muted-foreground">
                            DATE:{" "}
                            <span className="text-primary">
                                {dateFormat(startDate)} - {dateFormat(endDate)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="my-3 flex items-center justify-between gap-4">
                    <BranchSalesFilter type={reportType} />
                    <BranchSalesExport exportType={reportType} />
                </div>

                <DataTable
                    columns={branchSalesColumns}
                    data={salesByBranch}
                    footer={
                        <>
                            <TableCell className="left">Total:</TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByBranch.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_sales),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByBranch.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_profit),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByBranch.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_sales),
                                        0
                                    ) /
                                        salesByBranch.reduce(
                                            (acc, item) =>
                                                acc +
                                                Number(item.transaction_count),
                                            0
                                        )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    salesByBranch.reduce(
                                        (acc, item) =>
                                            acc +
                                            Number(item.transaction_count),
                                        0
                                    )
                                )}
                            </TableCell>
                        </>
                    }
                />
            </section>
        </Authenticated>
    );
};

export default SalesOverTimePage;
