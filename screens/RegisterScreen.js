import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: "",
    password: "",

    errorMessage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
          restaurantName: this.state.restaurant,
        });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../assets/authHeader.png")}
          style={{ marginTop: -116, marginLeft: -50 }}
        ></Image>
        <Image
          source={require("../assets/authFooter.png")}
          style={{ position: "absolute", bottom: -325, right: -225 }}
        ></Image>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={styles.avatar}></View>
          <Text
            style={styles.greeting}
          >{`Hello!\nSign up to get started.`}</Text>
          <Image source={require("../assets/loginLogo.png")}></Image>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType={"email-address"}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("SignIn")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
