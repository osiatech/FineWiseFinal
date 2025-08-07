export const categoryColor = (cat: string) => {
  switch (cat) {
    case "rental":
      return "bg-orange-400";
    case "shopping":
      return "bg-pink-400";
    case "entertainment":
      return "bg-purple-400";
    case "food":
      return "bg-blue-400";
    case "transportation":
      return "bg-yellow-400";
    default:
      return "bg-gray-400";
  }
};
