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
}: {
    onUpdate: (err: unknown, result: any) => void;
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
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};

export default BarcodeModal;
