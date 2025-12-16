import CustomError from "@/src/components/common/CustomError";
import PaymentTrackerSkeleton from "@/src/components/skeleton/PaymentTrackerSkeleton";
import { Colors } from "@/src/constants/colors";
import { useGetTrackerQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ParticipantsHeader from "./ParticipantsHeader";
import PaymentList from "./PaymentList";
import PaymentProgress from "./PaymentProgress";
import PaymentReceiver from "./PaymentReceiver";
import PaymentTrackerHeader from "./PaymentTrackerHeader";



const PaymentTrackerScreen = () => {
  const calculateCollected = (amount: number): void => {
    setCollectedAmount((prev) => prev + amount);
  };

  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const {data ,isLoading, isError } = useGetTrackerQuery(orderId);
  const [collectedAmount, setCollectedAmount] = useState<number>(data?.collectedAmount!);

const formmatedDate = new Date(data?.completedAt!).toLocaleDateString("en-GB", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      {isLoading ? (
        <PaymentTrackerSkeleton />
      ) : isError ? (
        <CustomError
          title="Error"
          message="Failed to load payment tracker. Please try again."
        />
      ) : (
        <>
          <View style={styles.dataSection}>
            <PaymentTrackerHeader
              restaurantName={data?.restaurantName!}
              orderDate={formmatedDate}
              orderTotal={data?.orderTotal!}
            />

            {/* Payment Receiver */}
            <PaymentReceiver textToCopy={data?.paymentInstructions!} />

            {/* Payment Progress */}
            <PaymentProgress remaining={data?.remainingAmount!} collected={collectedAmount} total={data?.orderTotal!} />
          </View>
          <ParticipantsHeader count={data?.participants!.length!} />
          <PaymentList participants={data?.participants} calculateTotal={calculateCollected} />
        </>
      )}
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
