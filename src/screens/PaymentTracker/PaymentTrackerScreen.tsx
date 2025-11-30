import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ParticipantsHeader from "./ParticipantsHeader";
import PaymentList from "./PaymentList";
import PaymentProgress from "./PaymentProgress";
import PaymentReceiver from "./PaymentReceiver";

type Props = {};

const PaymentTrackerScreen = ({}: Props) => {

    const [collectedAmount,setCollectedAmount]=useState<number>(0);
    const calculateCollected=(amount:number):void=>{
       setCollectedAmount(prev=>prev+amount);
    }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <View style={styles.dataSection}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <CustomText text="💰" textStyle={styles.image} />
        </View>

        {/* Title */}
        <CustomText text="Buffalo Burger" textStyle={styles.title} />

        {/* Info Row */}
        <View style={styles.infoContainer}>
          <CustomText text="Nov 21, 2025 • Total Bill:" textStyle={styles.date} />
          <CustomText text="850.00 EGP" textStyle={styles.price} />
        </View>

        {/* Payment Receiver */}
        <PaymentReceiver />

        {/* Payment Progress */}
        <PaymentProgress collected={collectedAmount} total={850} />
      </View>
      <ParticipantsHeader count={5}/>
      <PaymentList calculateTotal={calculateCollected}/>
    </ScrollView>
  );
};

export default PaymentTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dataSection: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.white,
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.red100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "SenExtraBold",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  date: {
    fontSize: 16,
    fontFamily: "SenRegular",
    color: Colors.gray500,
    marginRight: 5,
  },
  price: {
    fontSize: 18,
    fontFamily: "SenBold",
    color: Colors.black,
  },
});
