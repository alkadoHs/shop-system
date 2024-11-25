import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { SalesOverTime, salesOverTimeColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import SalesFilter from "./filters/SalesFilter";
import { dateFormat, numberFormat } from "@/lib/utils";
import { SalesExport } from "./filters/SalesExport";
import { TableCell } from "@/components/ui/table";

const SalesOverTimePage = ({
    sales,
    reportType,
    startDate,
    endDate,
}: {
    sales: SalesOverTime[];
    reportType: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated>
            <Head title="Sales Over Time" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Daily, Weekly, Monthly and Yearly Reports</H3>
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
                    <SalesFilter type={reportType} />
                    <SalesExport exportType={reportType} />
                </div>

                <DataTable
                    columns={salesOverTimeColumns}
                    data={sales}
                    footer={
                        <>
                            <TableCell className="left">Total:</TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    sales.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_sales),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    sales.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_profit),
                                        0
                                    )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    sales.reduce(
                                        (acc, item) =>
                                            acc + Number(item.total_sales),
                                        0
                                    ) /
                                        sales.reduce(
                                            (acc, item) =>
                                                acc +
                                                Number(item.transaction_count),
                                            0
                                        )
                                )}
                            </TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    sales.reduce(
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
