import { DataTable } from "@/components/data-table";
import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { ChangeEvent } from "react";
import { creditSaleColumns, CreditSales } from "./columns";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const CreditSalePage = ({ creditSales }: { creditSales: CreditSales }) => {
   const search = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === "") return router.get(route("credit-sales.index"));
    router.get(
        route("credit-sales.index"),
        {
            search: e.target.value,
        },
        {
            preserveState: true,
            replace: true,
        }
    );
}, 1000);
    return (
        <Authenticated>
            <Head title="Credit sales" />

            <section className="p-4">
                <div className="mb-2">
                    <H3>Credit sales</H3>
                </div>

                <div className="flex justify-between items-center gap-4 mb-2">
                  <Input type="search" name="search" className="max-w-sm" placeholder="Search by customer/order no." onChange={search} />
                </div>

                <DataTable
                    columns={creditSaleColumns}
                    data={creditSales.data}
                />
            </section>
        </Authenticated>
    );
};

export default CreditSalePage;
