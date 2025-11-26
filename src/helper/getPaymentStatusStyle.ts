import { Colors } from "../constants/colors";


export const getPaymentStatusStyle = (status: string) => {
    switch (status) {
        case "Completed":
            return { backgroundColor: Colors.green100 ,color:Colors.success ,fontFamily:"SenBold"};
        case "Pending":
            return { backgroundColor: Colors.yellow100 ,color:Colors.mustard ,fontFamily:"SenBold"}; 
        default:
            return { backgroundColor: "#EEE" };
    }
};