export function formatDate(dateStr: string): string {
  const days = [
    "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
  ];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const [datePart] = dateStr.split("T");
  if (!datePart) return "";

  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return "";

  let month = m;
  let year = y;
  if (month < 3) {
    month += 12;
    year -= 1;
  }
  const q = d;
  const K = year % 100;
  const J = Math.floor(year / 100);

  const h =
    (q +
      Math.floor((13 * (month + 1)) / 5) +
      K +
      Math.floor(K / 4) +
      Math.floor(J / 4) +
      5 * J) %
    7;

  const weekdayIndex = (h + 6) % 7;

  return `${days[weekdayIndex]}, ${d} ${months[m - 1]} ${y}`;
}

export function formatTime(dateStr: string): string {
  const timePart = dateStr.split("T")[1];
  if (!timePart) return "00:00";

  const [h = "00", m = "00"] = timePart.split(":");

  const hours = h.padStart(2, "0");
  const minutes = m.padStart(2, "0");

  return `${hours}:${minutes}`;
}
