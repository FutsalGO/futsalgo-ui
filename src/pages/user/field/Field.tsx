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
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-green-600">
        Daftar Lapangan
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex flex-col justify-center items-center  md:h-150 sm:h-dvh ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {fields.map((field) => (
            <Card
              key={field.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition rounded-2xl"
            >
              {field.imageUrl && (
                <img
                  src={`http://localhost:3000/uploadField/${field.imageUrl}`}
                  alt={field.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <CardHeader>
                <CardTitle className="text-xl">{field.name}</CardTitle>
                <CardDescription>{field.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Hari Kerja:</span> Rp{" "}
                  {field.weekday_price.toLocaleString()}
                </p>
                {field.weekend_price && (
                  <p className="text-sm">
                    <span className="font-semibold">Akhir Pekan:</span> Rp{" "}
                    {field.weekend_price.toLocaleString()}
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {new Date(field.created_at).toLocaleDateString("id-ID")}
                </p>
                <ScheduleDialog fieldId={field.id} image={field.imageUrl} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
