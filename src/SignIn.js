import React from "react";
import { View, Text, ImageBackground, Platform } from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";

const myBackGround = require("../assets/icons/landing.jpg");

export default class SignIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  logIn = () => {
    const { email, password } = this.state;
    this.props.signIn(email, password);
  };

  render() {
    return (
      <ImageBackground
        source={myBackGround}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.inputStyle}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                style={{}}
                autoCorrect={false}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                style={{}}
                autoCorrect={false}
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>
          </Form>
          <View style={{ marginTop: 10 }}>
            <Button primary block onPress={this.logIn}>
              <Text style={{ color: "white" }}>Sign In/Sign Up</Text>
            </Button>
          </View>
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
  },
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    margin: 10
  }
};
