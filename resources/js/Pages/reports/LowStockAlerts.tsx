import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LowStock, lowStockColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { LowStockExport } from "./exports/LowStockExport";

const LowStockPage = ({
    lowStockProducts,
}: {
    lowStockProducts: LowStock[];
}) => {
    return (
        <Authenticated>
            <Head title="Low stock alerts" />

            <section className="p-4">
                <div className="pb-3">
                    <H3>Low stock alerts</H3>
                </div>

                <div className="my-2.5">
                    <LowStockExport />
                </div>

                <DataTable columns={lowStockColumns} data={lowStockProducts} />
            </section>
        </Authenticated>
    );
};

export default LowStockPage;
