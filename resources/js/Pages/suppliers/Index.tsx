import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import React from "react";
import { Supplier, supplierColumns } from "./columns";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/data-table";
import { CreateSupplier } from "./actions/create-supplier";

const SupplierPage = ({ suppliers }: { suppliers: Supplier[] }) => {
    return (
        <Authenticated>
            <Head title="Suppliers" />

            <section className="p-4 space-y-6">
                <H3>Suppliers</H3>

                <div>
                    <CreateSupplier />
                </div>

                <Deferred data={"suppliers"} fallback={<Spinner />}>
                    <DataTable data={suppliers} columns={supplierColumns} />
                </Deferred>
            </section>
        </Authenticated>
    );
};

export default SupplierPage;
