import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Product } from "../products/Index";
import { DataTable } from "@/components/data-table";
import { cartItem, cartItemColumns, cartProductColumns } from "./columns";
import { Input } from "@/components/ui/input";

const Pos = ({ products, cartItems }: { products: Product[], cartItems: cartItem[] }) => {
  console.log(cartItems);
  
    return (
        <Authenticated header={<h2>Point of sale</h2>}>
            <Head title="Point of sale" />

            <main className="p-4">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input type='search' placeholder="Search products" />
                        <DataTable
                            columns={cartProductColumns}
                            data={products}
                        />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium">Cart Items</h2>

                      <DataTable columns={cartItemColumns} data={cartItems} />
                    </div>
                </section>
            </main>
        </Authenticated>
    );
};

export default Pos;
