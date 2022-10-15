export default function getExp(number) {
  if (number === "0") return "Beginner";
  if (number === "25") return "Novice";
  if (number === "50") return "Moderate";
  if (number === "75") return "Seasoned";
  if (number === "100") return "Pro";
}
