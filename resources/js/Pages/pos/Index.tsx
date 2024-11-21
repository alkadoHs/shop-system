import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Product } from "../products/Index";
import { DataTable } from "@/components/data-table";
import { cartItem, cartItemColumns, cartProductColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Payment } from "../payments/Index";
import OrderDetails from "./actions/OrderDetails";
import { numberFormat } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";

const Pos = ({
    products,
    cartItems,
    paymentMethods,
    total,
}: {
    products: Product[];
    cartItems: cartItem[];
    paymentMethods: Payment[];
    total: number;
}) => {
    const searchProduct = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === "") return router.get(route("pos.index"));
        router.get(
            route("pos.index"),
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
        <Authenticated header={<h2>Point of sale</h2>}>
            <Head title="Point of sale" />

            <main className="p-4">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-medium bg-muted px-4 rounded-md mb-2">
                            Cart Items
                        </h2>

                        <DataTable columns={cartItemColumns} data={cartItems} />
                        <div className="text-end font-bold pr-10">
                          Total: {numberFormat(Number(total))}
                        </div>

                        <OrderDetails payments={paymentMethods} total={total} />
                    </div>
                    <div className="space-y-2">
                        <Input type="search" name="search" onChange={searchProduct} placeholder="Search products" />
                        <DataTable
                            columns={cartProductColumns}
                            data={products}
                        />
                    </div>
                </section>
            </main>
        </Authenticated>
    );
};

export default Pos;
