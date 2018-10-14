import React from "react";
import { View, Text, ImageBackground, Platform } from "react-native";
import { Form, Item, Label, Input } from "native-base";
const myBackGround = require("../assets/icons/landing.jpg");

export default class SignIn extends React.Component {
  state = {
    email: ""
  };

  render() {
    return (
      <ImageBackground
        source={myBackGround}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.viewStyle}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                style={{}}
                autoCorrect={false}
                onChangeText={email => this.setState(email)}
              />
            </Item>
          </Form>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 30,
    color: "blue",
    textAlign: "center"
  }
};
