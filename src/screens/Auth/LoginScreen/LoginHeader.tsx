import React from "react";
import { StyleSheet, View } from "react-native";
import AuthHead from "../AuthHead";

const LoginHeader = () => (
  <View style={styles.header}>
    <AuthHead
      title="Login"
      description="Please log in to your existing account"
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default LoginHeader;
