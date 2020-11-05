import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

export const Loading = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    </ScreenContainer>
  );
};
const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
