import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Field {
  id: number;
  name: string;
  description?: string;
  weekday_price: number;
  weekend_price?: number;
  imageUrl?: string;
  created_at: string;
}

// dummy data
const fields: Field[] = [
  {
    id: 1,
    name: "Lapangan A",
    description: "Rumput sintetis standar FIFA",
    weekday_price: 150000,
    weekend_price: 200000,
    imageUrl: "https://via.placeholder.com/300x200",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Lapangan B",
    description: "Lapangan indoor full AC",
    weekday_price: 18_0000,
    weekend_price: 22_0000,
    imageUrl: "https://via.placeholder.com/300x200",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Lapangan C",
    description: "Lapangan outdoor dengan tribun",
    weekday_price: 120000,
    weekend_price: 170000,
    imageUrl: "https://via.placeholder.com/300x200",
    created_at: new Date().toISOString(),
  },
];

export default function FieldPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Available Fields</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {fields.map((field) => (
          <Card key={field.id} className="w-72">
            {field.imageUrl && (
              <img
                src={field.imageUrl}
                alt={field.name}
                className="w-full h-40 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{field.name}</CardTitle>
              <CardDescription>{field.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Weekday: Rp {field.weekday_price}</p>
              {field.weekend_price && <p>Weekend: Rp {field.weekend_price}</p>}
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                {new Date(field.created_at).toLocaleDateString()}
              </p>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                Book Now
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
