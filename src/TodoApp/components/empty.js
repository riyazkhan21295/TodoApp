import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmptyList = (props) => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>No Todos found</Text>
      <Text style={styles.description}>
        Start adding ot track your things to do.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {},
  text: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
  },
  description: {
    marginTop: 10,
    color: "#fff",
    fontSize: 12,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
