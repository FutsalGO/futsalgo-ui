// src/pages/Home.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FaMosque,
  FaUtensils,
  FaParking,
  FaShower,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const review = [
    {
      title: "Booking Mudah",
      desc: "Pesan lapangan dengan beberapa klik saja",
    },
    {
      title: "Banyak Lapangan",
      desc: "Tersedia berbagai pilihan lapangan futsal",
    },
    {
      title: "Harga Terjangkau",
      desc: "Main futsal tanpa bikin kantong bolong",
    },
  ];
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('/field.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Booking Lapangan Futsal Mudah & Cepat
          </motion.h1>
          <Link to={"/field"}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-2xl shadow-lg mt-14 bg-rose-500  hover:cursor-pointer"
            >
              Pesan Sekarang
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Kenapa Pilih Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
          {review.map((item, idx) => (
            <Card key={idx} className="shadow-md rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Fasilitas Tersedia</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20">
          {[
            { icon: <FaMosque size={40} />, label: "Masjid" },
            { icon: <FaUtensils size={40} />, label: "Tempat Makan" },
            { icon: <FaParking size={40} />, label: "Parkir Gratis" },
            { icon: <FaShower size={40} />, label: "Ruang Ganti" },
          ].map((f, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow"
            >
              <div className="text-green-600 mb-3">{f.icon}</div>
              <p className="font-semibold">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Apa Kata Mereka?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
          {[
            { name: "Andi", text: "Booking gampang, pelayanannya cepat" },
            { name: "Budi", text: "Lapangan bersih dan nyaman" },
            { name: "Sari", text: "Harganya terjangkau banget!" },
          ].map((t, idx) => (
            <Card key={idx} className="shadow-md rounded-2xl">
              <CardContent className="p-6">
                <p className="italic text-gray-700 mb-3">“{t.text}”</p>
                <p className="font-semibold text-green-600">- {t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section className="py-16 text-center bg-gray-800 text-white">
        <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
        <p className="mb-3">📞 WhatsApp: 0812-3456-7890</p>
        <p className="mb-3">📍 Lokasi: Jalan Raya Futsal No. 10, Jakarta</p>
        <p>📷 Instagram: @futsalgo</p>
      </section>
    </div>
  );
}
