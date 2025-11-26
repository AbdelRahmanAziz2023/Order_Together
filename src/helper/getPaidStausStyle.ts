import { Colors } from "../constants/colors";

export const getPaidStatusStyle = (status: string) => {
    switch (status) {
        case "Unpaid":
            return { backgroundColor: Colors.red100 ,color:Colors.lightred, fontFamily:"SenBold"};
        case "Paid":
            return { backgroundColor: Colors.green100 ,color:Colors.success, fontFamily:"SenBold"}; 
        default:
            return { backgroundColor: "#EEE" };
    }
};