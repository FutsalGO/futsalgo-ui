import { formatDate, formatTime } from "@/lib/dateFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Booking } from "@/types/booking";
import instance from "@/server/Axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ConfirmStatusDialog } from "@/components/admin/DialogBookingStatusChange";
import type { Field } from "@/types/field";
import { SquarePen, Trash2 } from "lucide-react";
import DialogEditField from "./DialogEditField";
import DialogDeleteField from "./DialogDeleteField";

interface Props {
  field: Field;
  setFields: (fields: any) => void;
}

export default function FieldRow({ field, setFields }: Props) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleUpdate = async (payload: any) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("weekday_price", payload.weekday_price.toString());
      formData.append("weekend_price", payload.weekend_price.toString());
      if (payload.image) formData.append("imageUrl", payload.image!);

      instance.put(`/fields/${field.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFields((prev: Field[]) =>
        prev.map((f) => (f.id === field.id ? { ...f, ...payload } : f))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await instance.delete(`/fields/del/${field.id}`);
      setFields((prev: Field[]) => prev.filter((f) => f.id !== field.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow>
      <DialogEditField
        field={field}
        open={openEdit}
        onOpenChange={setOpenEdit}
        handleUpdate={handleUpdate}
      />
      <DialogDeleteField
        open={openDelete}
        onOpenChange={setOpenDelete}
        handleDelete={handleDelete}
      />
      <TableCell className="font-medium">{field.name}</TableCell>
      <TableCell>{field.description}</TableCell>
      <TableCell>{field.weekday_price}</TableCell>
      <TableCell>{field.weekend_price}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <SquarePen
            onClick={() => setOpenEdit(true)}
            className="w-5 h-5 cursor-pointer text-yellow-600"
          />
          <Trash2
            onClick={() => setOpenDelete(true)}
            className="w-5 h-5 cursor-pointer text-red-600"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
