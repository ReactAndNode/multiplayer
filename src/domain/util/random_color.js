const COLORS = [
  "#FF3366",
  "#FFBB00",
  "#0088FF",
  "#22DD88",
  "#FF0099",
  "#0C2D48",
];

export const randomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};
