import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, router } from "@inertiajs/react";
import { Product } from "../products/Index";
import { DataTable } from "@/components/data-table";
import { cartItem, cartItemColumns, cartProductColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Payment } from "../payments/Index";
import OrderDetails from "./actions/OrderDetails";
import { numberFormat } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "@/components/ui/spinner";
import { ProductCompany } from "../product-companies/columns";

const Pos = ({
    products,
    cartItems,
    paymentMethods,
    productCompanies,
    total,
}: {
    products: Product[];
    cartItems: cartItem[];
    paymentMethods: Payment[];
    productCompanies: ProductCompany[];
    total: number;
}) => {
    const searchProduct = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") return router.get(route("pos.index"));
            router.get(
                route("pos.index"),
                {
                    search: e.target.value,
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        },
        1000
    );

    return (
        <Authenticated header={<h2>Point of sale</h2>}>
            <Head title="Point of sale" />

            <main className="p-4">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-medium bg-muted px-4 rounded-md mb-2">
                            Cart Items
                        </h2>

                        <Deferred data={"cartItems"} fallback={<Spinner />}>
                            <DataTable
                                columns={cartItemColumns}
                                data={cartItems}
                            />
                        </Deferred>

                        <div className="text-end font-bold pr-10">
                            <Deferred data={"total"} fallback={<Spinner />}>
                                <p>Total: {numberFormat(Number(total))}</p>
                            </Deferred>
                        </div>

                        <Deferred
                            data={["paymentMethods", "total"]}
                            fallback={<Spinner />}
                        >
                            <OrderDetails
                                payments={paymentMethods}
                                total={total}
                            />
                        </Deferred>
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="search"
                            name="search"
                            onChange={searchProduct}
                            placeholder="Search products"
                        />
                        <Deferred data={"products"} fallback={<Spinner />}>
                            <DataTable
                                columns={cartProductColumns}
                                data={products}
                            />
                        </Deferred>
                    </div>
                </section>
            </main>
        </Authenticated>
    );
};

export default Pos;
