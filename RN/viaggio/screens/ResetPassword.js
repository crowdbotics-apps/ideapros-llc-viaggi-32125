import React, {useState, useEffect} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import AsyncStorage from '@react-native-community/async-storage';

const Blank = ({navigation}) => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [LoadingEffect, setLoadingEffect] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_token_vg').then((value) =>
      setUserToken(value),
    );
  }, []);

  const handleSubmitButton = () => {
    // navigation.replace('LogIn');

    if (!newPassword) {
      alert('Please fill Password');
      return;
    }
    if (!confirmNewPassword) {
      alert('Please confirm Password');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Password and Confirm Password does not match');
      return;
    }

    setLoadingEffect(true);
    
    var dataToSend = {
      password_1: newPassword,
      password_2: confirmNewPassword,
    };
    
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);

    fetch('https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/password/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Token ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response: ", responseJson);
        setLoadingEffect(false);
        setPasswordResetSuccess(true);
        setTimeout(() => {
          AsyncStorage.clear();
          AsyncStorage.setItem('user_onboarding_status', "true");
          setPasswordResetSuccess(false);
          navigation.replace('LogIn');
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        {LoadingEffect && <View style={styles.Loading_effect}>
          <ImageBackground source={require("../assets/images/loading.gif")} style={styles.Loading_effect_image} />
        </View>}

        {passwordResetSuccess && <View style={styles.Loading_effect}>
          <Text style={styles.Loading_effect_text}>
            Password Updated Successfully. Please Login.
          </Text>
        </View>}

        <ImageBackground source={require ('../assets/images/viaggi_splash_logo.png')} style={styles.ImageBackground_86_909} />

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Reset Your Password
          </Text>
          <Text style={styles.Text_87_2}>
            Please set up a password to secure your account
          </Text>

          <View style={styles.View_4}>
            <TextInput secureTextEntry={true} style={styles.TextInput_1} placeholder="Set new password" onChangeText={(NewPassword) => setNewPassword(NewPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.ImageBackground_86_909_2} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput secureTextEntry={true} style={styles.TextInput_1} placeholder="Confirm new password" onChangeText={(ConfirmNewPassword) => setConfirmNewPassword(ConfirmNewPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.ImageBackground_86_909_2} />
            </View>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity style={styles.Touchable_full_cover}
              onPress={() => handleSubmitButton()}
            >
              <Text style={styles.Text_90}>
              Continue
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Touchable_full_cover: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
  },
  Loading_effect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, .9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  Loading_effect_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3dc0b9",
    backgroundColor: "rgba(61, 192, 185, .2)",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    position: "absolute",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    width: 350,
    height: 80,
    marginTop: -40,
    marginLeft: -175,
    lineHeight: 35,
  },
  Loading_effect_image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 70,
    height: 70,
    marginTop: -35,
    marginLeft: -35,
  },
  View_3: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9faff",  
  },
  ImageBackground_86_909:{
    width: 183,
    height: 53,
    marginTop: 100,
    marginBottom: 40,
    alignSelf: "center",
  },
  View_2: {
    fontFamily: "Museo Slab",
  },
  Text_87: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 23,
    lineHeight: 24,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .9,
    marginBottom: 10,
  },
  Text_87_2: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 20,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .7,
    marginBottom: 48,
  },
  View_4: {
    width: "90%",
    height: 55,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  TextInput_1: {
    width: "100%",
    height: 55,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 60,
  },
  input_icon_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    left: 10,
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 120,
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
  ImageBackground_86_909_2: {
    width: 20,
    height: 18,
    position: "relative",
    top: 6,
    left: 5,
  },
})


export default Blank