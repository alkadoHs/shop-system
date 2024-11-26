import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { deadStock, deadStockColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { dateFormat, numberFormat } from "@/lib/utils";
import { TableCell } from "@/components/ui/table";
import DeadStockFilter from "./filters/DeadStockFilter";
import { DeadStockExport } from "./filters/DeadStockExport";

const DeadStockPage = ({
    deadStocks,
    reportType,
    startDate,
    endDate,
}: {
    deadStocks: deadStock[];
    reportType: string;
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated>
            <Head title="Dead Stocks" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Dead Stocks(products)</H3>
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
                    <DeadStockFilter type={reportType} />
                    <DeadStockExport exportType={reportType} />
                </div>

                <DataTable
                    columns={deadStockColumns}
                    data={deadStocks}
                    footer={
                        <>
                            <TableCell className="left">Total:</TableCell>
                            <TableCell className="left">
                            </TableCell>
                            <TableCell className="left"></TableCell>
                            <TableCell className="left"></TableCell>
                            <TableCell className="left">
                                {numberFormat(
                                    deadStocks.reduce(
                                        (acc, item) =>
                                            acc + Number(item.stock_value),
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

export default DeadStockPage;
