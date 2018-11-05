import React from "react";
import { Text, View, Platform } from "react-native";
import Meteor, { createContainer, Accounts } from "react-native-meteor";
import SignIn from "./src/SignIn";
import PokeMap from "./src/PokeMap";

const IP_ADDRESS = "192.168.43.57";
const SERVER_URL = `ws://${IP_ADDRESS}:3000/websocket`;

export default class App extends React.Component {
  state = {
    loggedIn: ""
  };

  componentDidMount() {
    Meteor.connect(SERVER_URL);
    if (Meteor.userId()) {
      this.flipLogin(true);
    }
  }

  flipLogin = x => {
    this.setState({ loggedIn: x });
  };

  signIn = (email, password) => {
    Meteor.loginWithPassword(email, password, (error, data) => {
      if (error) {
        if (error.reason === "User not found") {
          Accounts.createUser({ email, password }, error => {
            console.log(error);
          });
        }
      } else {
        console.log("email");
        console.log(Meteor.userId());
        this.flipLogin(true);
      }
    });
  };

  renderView = () => {
    if (!this.state.loggedIn) {
      return <SignIn signIn={this.signIn} />;
    } else {
      return <PokeMap />;
    }
  };

  render() {
    return <View style={styles.container}>{this.renderView()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 24 : 0
  }
};
