import { useTogglePaidStatusMutation } from "@/src/services/api/endpoints/orderEndpoints";
import { TrackerParticipant } from "@/src/types/order.type";
import { useCallback, useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";

type UsePaymentListProps = {
  participants?: TrackerParticipant[];
  orderId: string;
  calculateTotal: (amount: number) => void;
};

const usePaymentList = ({ participants, orderId, calculateTotal }: UsePaymentListProps) => {
  const list = participants ?? [];

  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    list.reduce((acc, p) => {
      acc[p.userId] = p.isPaid;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [togglePaid, { isLoading }] = useTogglePaidStatusMutation();

  // Sync toggles when participants change and run host auto-paid amount
 const hasRun = useRef(false);

useEffect(() => {
  if (hasRun.current) return;
  hasRun.current = true;

  setToggles(
    list.reduce((acc, p) => {
      acc[p.userId] = p.isPaid;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const host = list.find((p) => p.isHost);
  if (host) {
    calculateTotal(host.total);
  }
}, [participants]);

  const toggleSwitch = useCallback(
    async (id: string) => {
      const participant = list.find((p) => p.userId === id);
      if (!participant) return;

      const isCurrentlyPaid = !!toggles[id];

      try {
         // Update total
        calculateTotal(isCurrentlyPaid ? -participant.total : participant.total);

        // Toggle state
        setToggles((prev) => ({ ...prev, [id]: !isCurrentlyPaid }));

        await togglePaid({ userId: id, orderId: orderId!, body: { isPaid: !isCurrentlyPaid } }).unwrap();

       
        Toast.show({
          type: "success",
          text1: "Success",
          text2: isCurrentlyPaid ? "Participant marked as unpaid" : "Participant marked as paid",
        });
      } catch (error) {
        console.debug("Error toggling paid status:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update payment status. Please try again.",
        });
      }
    },
    [toggles, list, togglePaid, calculateTotal, orderId]
  );

  return { toggles, toggleSwitch, isLoading };
};

export default usePaymentList;
