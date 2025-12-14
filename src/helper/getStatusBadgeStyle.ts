import { Colors } from "../constants/colors";

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Locked":
      return { backgroundColor: Colors.lightred };
    case "Open":
      return { backgroundColor: Colors.success };
    default:
      return { backgroundColor: "#EEE" };
  }
};

export default getStatusBadgeStyle;
