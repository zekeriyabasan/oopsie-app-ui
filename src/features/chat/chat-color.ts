export const getUserColor = (userId: string) => {
const colors = [
  "#fca5a5", // soft kırmızı / coral
  "#93c5fd", // pastel mavi
  "#a7f3d0", // mint yeşili
  "#fde68a", // pastel sarı
  "#ddd6fe", // lavanta
  "#fecdd3", // soft pembe
  "#bfdbfe", // açık gökyüzü
  "#bbf7d0", // açık yeşil
];


  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash += userId.charCodeAt(i);
  }

  return colors[hash % colors.length];
};
