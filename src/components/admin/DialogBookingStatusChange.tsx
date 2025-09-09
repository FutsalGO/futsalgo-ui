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
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>
            Are you sure you want to change the status to{" "}
            <span className="font-semibold capitalize">{status}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirm(status)}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
