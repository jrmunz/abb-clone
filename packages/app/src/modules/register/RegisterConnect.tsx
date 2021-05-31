import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";

export const RegisterConnect = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Register New Account</Text>
      <Button title="Register" style={{ width: 200, marginTop: 15 }} />
    </View>
  );
};
