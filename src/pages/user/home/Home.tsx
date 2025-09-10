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
  FaStar,
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
    <div className="min-h-screen bg-[#F1F0E9]">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center bg-[url('/field.WebP')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Booking Lapangan Futsal Mudah & Cepat
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <Link to={"/field"}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-2xl shadow-lg mt-14 bg-rose-500 hover:cursor-pointer"
                >
                  Pesan Sekarang
                  <FaArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        {/* Keunggulan */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-10">Kenapa Pilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
            {review.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-md rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fasilitas */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-10">Fasilitas Tersedia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20">
            {[
              { icon: <FaMosque size={50} />, label: "Masjid" },
              { icon: <FaUtensils size={50} />, label: "Tempat Makan" },
              { icon: <FaParking size={50} />, label: "Parkir Gratis" },
              { icon: <FaShower size={50} />, label: "Ruang Ganti" },
            ].map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center bg-white p-6 rounded-2xl shadow"
              >
                <div className="text-green-600 mb-3">{f.icon}</div>
                <p className="font-semibold text-lg">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimoni */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-28">Apa Kata Mereka?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20  ">
            {[
              {
                name: "Andi",
                text: "Booking gampang, pelayanannya cepat",
                img: "/orang.jpg",
                rating: 5,
              },
              {
                name: "Budi",
                text: "Lapangan bersih dan nyaman",
                img: "/orang2.jpg",
                rating: 5,
              },
              {
                name: "Sari",
                text: "Harganya terjangkau banget!",
                img: "/sari.jpg",
                rating: 5,
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white  rounded-2xl shadow-lg p-6 pt-14"
              >
                {/* Foto di atas card */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover object-top shadow-md"
                  />
                </div>

                {/* Isi Card */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">{t.name}</h3>

                  {/* Rating bintang */}
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < t.rating ? "text-yellow-400" : "text-gray-500"
                        } text-lg`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-800 text-xl italic">“{t.text}”</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <footer className="bg-gradient-to-r bg-gray-900 text-gray-300 py-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="-ml-32">
              <h3 className="text-3xl font-bold text-white">FutsalGO</h3>
              <p className="text-lg mt-2">
                Booking lapangan futsal mudah & cepat 🚀
              </p>
            </div>

            {/* Kontak */}
            <div className="space-y-2 text-lg -mr-28">
              <p>📞 WhatsApp: 0812-3456-7890</p>
              <p>📍 Jl. Raya Futsal No. 10, Jakarta</p>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-4 text-center text-base text-gray-400">
            © {new Date().getFullYear()} FutsalGO
          </div>
        </footer>
      </div>
    </div>
  );
}
