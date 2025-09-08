import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import instance from "@/server/Axios";
import FieldRow from "@/components/admin/FieldRow";
import type { Field } from "@/types/field";
import DialogCreateField from "@/components/admin/DialogCreateField";

export default function Field() {
  const [open, setOpen] = useState<boolean>(false)
  const [fields, setFields] = useState<Field[] | null>(null)

  const handleCreate = (payload: any) => {
    try {
      const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('description', payload.description)
        formData.append('weekday_price', payload.weekday_price.toString())
        formData.append('weekend_price', payload.weekend_price.toString())
        if(payload.image) formData.append('imageUrl', payload.image!)

    instance
      .post(`/fields/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        const data: Field = res.data.data
        setFields(prev => prev ? [...prev, data] : [data])
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    instance
      .get(`/fields/`)
      .then((res) => {
        const data: Field[] = res.data.data
        setFields(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
    <DialogCreateField open={open} onOpenChange={setOpen} handleCreate={handleCreate} />
    <div className="p-6 min-h-screen max-h-screen overflow-auto">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Daftar Lapangan</h2>
          <Button 
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-1xl font-semibold px-3 py-2 rounded-md shadow transition"
          >Tambah Lapangan</Button>
        </div>
        {/* Tabel */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-green-600">Nama</TableHead>
              <TableHead className="text-green-600">Deskripsi</TableHead>
              <TableHead className="text-green-600">Harga Weekday</TableHead>
              <TableHead className="text-green-600">Harga Weekend</TableHead>
              <TableHead className="text-green-600">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.map((field) => (
              <FieldRow key={field.id} field={field} setFields={setFields} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </>
  )
}
