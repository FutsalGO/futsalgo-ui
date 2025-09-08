import {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface Payload {
  name: string
  description: string
  weekday_price: number
  weekend_price: number
  image?: File
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleCreate: (payload: Payload) => void
}

export default function DialogCreateField({
  open,
  onOpenChange,
  handleCreate,
}: Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [weekdayPrice, setWeekdayPrice] = useState<number | "">("")
  const [weekendPrice, setWeekendPrice] = useState<number | "">("")
  const [image, setImage] = useState<File | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim() || !weekdayPrice || !weekendPrice) return

    const payload: Payload = {
      name,
      description,
      weekday_price: Number(weekdayPrice),
      weekend_price: Number(weekendPrice),
      image,
    }

    handleCreate(payload)
    setName("")
    setDescription("")
    setWeekdayPrice("")
    setWeekendPrice("")
    setImage(undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Lapangan</DialogTitle>
          <DialogDescription>
            Masukkan informasi lapangan yang akan ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weekday_price">Weekday Price</Label>
            <Input
              id="weekday_price"
              type="number"
              placeholder="100"
              value={weekdayPrice}
              onChange={(e) => setWeekdayPrice(e.target.value ? Number(e.target.value) : "")}
              required
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weekend_price">Weekend Price</Label>
            <Input
              id="weekend_price"
              type="number"
              placeholder="150"
              value={weekendPrice}
              onChange={(e) => setWeekendPrice(e.target.value ? Number(e.target.value) : "")}
              required
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
