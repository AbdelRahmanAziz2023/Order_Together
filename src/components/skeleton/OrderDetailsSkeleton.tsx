import { Colors } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "react-native-skeletons";

const OrderDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Skeleton width={200} height={22} borderRadius={8} />
          <Skeleton width={80} height={18} borderRadius={6} />
        </View>

        {/* Members row */}
        <View style={styles.membersRow}>
          <Skeleton width={140} height={20} borderRadius={8} />
          <Skeleton width={60} height={18} borderRadius={6} />
        </View>

        {/* Toggle */}
        <View style={styles.toggleRow}>
          <Skeleton width={120} height={34} borderRadius={18} />
          <Skeleton width={120} height={34} borderRadius={18} />
        </View>

        {/* List skeleton (several items) */}
        <View style={{ marginTop: 12 }}>
          <Skeleton width={"100%"} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
          <Skeleton width={"100%"} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
          <Skeleton width={"100%"} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
        </View>

        {/* Totals */}
        <View style={styles.totalsRow}>
          <Skeleton width={120} height={18} borderRadius={6} />
          <Skeleton width={80} height={18} borderRadius={6} />
        </View>

        {/* Actions / buttons */}
        <View style={styles.actionsRow}>
          <Skeleton width={120} height={44} borderRadius={10} />
          <Skeleton width={120} height={44} borderRadius={10} />
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsSkeleton;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F5F6FA", flex: 1 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 150,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  membersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
    marginVertical: 12,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
});