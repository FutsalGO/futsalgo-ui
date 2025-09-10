import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirm: (status: string) => void;
  status: string;
}

export const ConfirmStatusDialog: React.FC<ConfirmStatusDialogProps> = ({
  open,
  onOpenChange,
  handleConfirm,
  status,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Perbarui Status</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin mengubah status menjadi{" "}
            <span className="font-semibold capitalize">{status}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={() => handleConfirm(status)} className="bg-green-600 hover:bg-green-700">Perbarui</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
