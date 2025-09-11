export const calculateNutrition = (berat, tinggi, usia, gender, aktivitas, tujuan) => {
  // Rumus Harris-Benedict
  let bmr;
  if (gender === "male") {
    bmr = 88.36 + 13.4 * berat + 4.8 * tinggi - 5.7 * usia;
  } else {
    bmr = 447.6 + 9.2 * berat + 3.1 * tinggi - 4.3 * usia;
  }

  // Faktor aktivitas
  const aktivitasMap = {
    rendah: 1.2,
    sedang: 1.55,
    tinggi: 1.9,
  };
  let kalori = bmr * (aktivitasMap[aktivitas] || 1.2);

  if (tujuan === "bulking") kalori += 300;
  if (tujuan === "cutting") kalori -= 300;

  // Hitung distribusi makronutrien
  return {
    kalori: Math.round(kalori),
    protein: Math.round((kalori * 0.2) / 4), // 20% protein, 4 kal/g
    karbohidrat: Math.round((kalori * 0.55) / 4), // 55% karbo, 4 kal/g
    lemak: Math.round((kalori * 0.25) / 9), // 25% lemak, 9 kal/g
  };
};
