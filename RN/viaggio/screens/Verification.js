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

  const [Otp1, setOtp1] = useState("");
  const [Otp2, setOtp2] = useState("");
  const [Otp3, setOtp3] = useState("");
  const [Otp4, setOtp4] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
      AsyncStorage.getItem('user_email_for_token').then((value) =>
        setUserEmail(value),
      );
  }, []);

  const handleSubmitButton = () => {
    
    if (!Otp1 && !Otp2 && !Otp3 && !Otp4) {
      alert('Please fill Token');
      return;
    }
    
    var dataToSend = {
      otp: Otp1 + Otp2 + Otp3 + Otp4,
      email: userEmail,
    };
    
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);

    fetch('https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/verify/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response: ", responseJson);
        AsyncStorage.setItem('user_token_vg', responseJson.token);

        navigation.replace('ResetPassword');
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

        <ImageBackground source={require ('../assets/images/viaggi_splash_logo.png')} style={styles.ImageBackground_86_909} />

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Verification
          </Text>
          <Text style={styles.Text_87_2}>
            4 digit OTP has been sent to your mail. Enter the code below to continue
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="5" onChangeText={(Otp1) => setOtp1(Otp1)} />
            <TextInput style={styles.TextInput_1} placeholder="" onChangeText={(Otp2) => setOtp2(Otp2)} />
            <TextInput style={styles.TextInput_1} placeholder="" onChangeText={(Otp3) => setOtp3(Otp3)} />
            <TextInput style={styles.TextInput_1} placeholder="" onChangeText={(Otp4) => setOtp4(Otp4)} />
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
            >
              <Text style={styles.Text_90}>
              Verify Now
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
 
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
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
    width: "100%",
    height: 55,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 85,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  TextInput_1: {
    width: 48,
    height: 45,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4F5454",
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    alignContent: "center",
    textAlign: "center",
    marginLeft: 9,
    marginRight: 9,
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
})


export default Blank