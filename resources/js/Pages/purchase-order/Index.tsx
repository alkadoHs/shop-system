import { DataTable } from "@/components/data-table";
import { H3 } from "@/components/ui/heading-with-anchor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, Link } from "@inertiajs/react";
import { PurchaseOrder, purchaseOrderColumns } from "./columns";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const Index = ({ purchaseOrders }: { purchaseOrders: PurchaseOrder[] }) => {
    return (
        <Authenticated>
            <Head title="Purchase Orders" />

            <section className="p-4 space-y-6">
                <H3>Purchase orders</H3>

                <Button asChild>
                    <Link href={route("purchases.create")}>
                        Create purchase
                    </Link>
                </Button>

                <Deferred data="purchaseOrders" fallback={<Spinner />}>
                    <DataTable
                        columns={purchaseOrderColumns}
                        data={purchaseOrders}
                    />
                </Deferred>
            </section>
        </Authenticated>
    );
};

export default Index;
