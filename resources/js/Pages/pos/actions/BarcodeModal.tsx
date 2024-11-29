import { Button } from "@/components/ui/button";
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalTrigger,
} from "@/components/ui/responsoive-model";
import { ScanBarcode } from "lucide-react";
import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeModal = ({
    onUpdate,
    imei,
}: {
    onUpdate: (err: unknown, result: any) => void;
    imei?: string;
}) => {
    return (
        <ResponsiveModal>
            <ResponsiveModalTrigger>
                <Button
                    variant={"secondary"}
                    className="text-orange-500"
                    size={"icon"}
                >
                    <ScanBarcode className="size-5" />
                </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent>
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={onUpdate}
                />
                <br />
                <p>ID: {imei}</p>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};

export default BarcodeModal;
