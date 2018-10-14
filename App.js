import React from "react";
import { Text, View, Platform } from "react-native";
import SignIn from "./src/SignIn";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SignIn />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 24 : 0
  }
};
