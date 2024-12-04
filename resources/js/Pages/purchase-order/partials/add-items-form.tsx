import React from "react";
import FormRepeater from "@/components/form-repeater";
import {
    ComboBox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
} from "@/components/Combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";

interface Item {
    product_id?: number;
    qty: number;
    buy_price: number;
    sale_price: number;
}

interface Product {
    id: number;
    name: string;
    buy_price: number;
    sale_price: number;
}

export default function AddItemsForm({ products }: { products: Product[] }) {
    const initialItem: Item = {
        product_id: undefined,
        qty: 1,
        buy_price: 0,
        sale_price: 0,
    };

    const handleSubmit = (data: Item[]) => {
        console.log("Submitted Items:", data);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // Collect form data and handle submission
            }}
        >
            <h1 className="text-xl font-semibold mb-4">Add Items</h1>
            <FormRepeater<Item>
                initialValues={initialItem}
                renderFields={(item, index, handleChange) => (
                    <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="product_id">Product</Label>
                            <ComboBox
                                value={item.product_id?.toString()}
                                onValueChange={(value) => {
                                    const selectedProduct = products.find(
                                        (product) =>
                                            product.id.toString() === value
                                    );

                                    console.log(
                                        "Selected Product:",
                                        selectedProduct
                                    );

                                    if (selectedProduct) {
                                        handleChange(index, undefined, {
                                            product_id: selectedProduct.id,
                                            buy_price:
                                                selectedProduct.buy_price,
                                            sale_price:
                                                selectedProduct.sale_price,
                                        });
                                    }
                                }}
                            >
                                <ComboboxInput placeholder="Select product" />
                                <ComboboxContent>
                                    {products.map((product) => (
                                        <ComboboxItem
                                            key={product.id}
                                            value={product.id.toString()}
                                            label={product.name}
                                        >
                                            {product.name}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxContent>
                            </ComboBox>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium">
                                Quantity
                            </label>
                            <Input
                                type="number"
                                value={item.qty}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "qty",
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="buy_price">
                                Buying price
                            </Label>
                            <Input
                                type="number"
                                id="buy_price"
                                value={item.buy_price}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "buy_price",
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="sale_price">
                                Selling Price
                            </Label>
                            <Input
                                type="number"
                                id="sale_price"
                                value={item.sale_price}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "sale_price",
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
            />
            <Button type="submit" className="mt-4">
                Submit
            </Button>
        </form>
    );
}
