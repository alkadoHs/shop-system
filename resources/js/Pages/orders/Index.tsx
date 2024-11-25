import { DataTable } from "@/components/data-table";
import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { ChangeEvent } from "react";
import { Orders, pendingOrderColumns } from "./columns";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

const PendingOrderPage = ({ orders }: { orders: Orders }) => {
    const search = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "")
            return router.get(route("pending-orders.index"));
        router.get(
            route("pending-orders.index"),
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
            <Head title="Pending orders" />

            <section className="p-4 space-y-3">
                <div>
                    <H3>All Invoices</H3>
                </div>

                <div className="flex justify-between items-center gap-4 mb-2">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search by customer/order no."
                        onChange={search}
                    />
                </div>

                <DataTable columns={pendingOrderColumns} data={orders.data} />
            </section>
        </Authenticated>
    );
};

export default PendingOrderPage;
