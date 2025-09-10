// src/pages/FieldPage.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/GlobalStore";
import { fetchFields } from "@/slices/fieldSlice";
import { ScheduleDialog } from "@/pages/user/field/dialog/Schedule";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function FieldPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { fields, loading, error } = useSelector(
    (state: RootState) => state.fields
  );

  useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F1F0E9] py-10 px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center text-green-600">
        Daftar Lapangan
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex justify-center items-start">
        {fields.length === 0 && !loading ? (
          <p className="text-gray-500 text-lg">Belum ada lapangan tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {fields.map((field) => (
              <Card
                key={field.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 rounded-2xl"
              >
                {field.imageUrl && (
                  <img
                    src={`http://localhost:3000/uploadField/${field.imageUrl}`}
                    alt={field.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                )}

                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {field.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {field.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Hari Kerja:</span>{" "}
                    <span className="font-bold text-green-700">
                      Rp {field.weekday_price.toLocaleString("id-ID")}
                    </span>
                  </p>
                  {field.weekend_price && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Akhir Pekan:</span>{" "}
                      <span className="font-bold text-green-700">
                        Rp {field.weekend_price.toLocaleString("id-ID")}
                      </span>
                    </p>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(field.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <ScheduleDialog fieldId={field.id} image={field.imageUrl} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
