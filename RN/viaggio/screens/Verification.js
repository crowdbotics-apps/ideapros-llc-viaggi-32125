import React, {useState, useEffect, useRef} from "react"
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

  const secondTextInput = useRef(null);
  const thirdTextInput = useRef(null);
  const fourthTextInput = useRef(null);

  const [Otp1, setOtp1] = useState("");
  const [Otp2, setOtp2] = useState("");
  const [Otp3, setOtp3] = useState("");
  const [Otp4, setOtp4] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [LoadingEffect, setLoadingEffect] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSendSuccess, setOtpSendSuccess] = useState(false);

  useEffect(() => {
      AsyncStorage.getItem('user_email_for_token').then((value) =>
        setUserEmail(value),
      );
  }, []);

  const handleSubmitButton = () => {
    
    if (!Otp1.trim() || !Otp2.trim() || !Otp3.trim() || !Otp4.trim()) {
      alert('Please fill Token');
      return;
    }
    // console.log("OTP: " + Otp1 + Otp2 + Otp3 + Otp4);
    // return
    setLoadingEffect(true);
    
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
        setLoadingEffect(false);
        setOtpVerified(true);
        console.log("Response: ", responseJson);
        AsyncStorage.setItem('user_token_vg', responseJson.token);
        setTimeout(() => {
          navigation.replace('ResetPassword');
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  const handleResendOtp = () => {
    setLoadingEffect(true);

    var dataToSend = {
      email: userEmail
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);

    fetch('https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/otp/', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.status)
      .then((responseJson) => {
        console.log("Response: ", responseJson);
        setLoadingEffect(false);
        setOtpSendSuccess(true);
        if (responseJson === 200) {
          setTimeout(() => {
            setOtpSendSuccess(false);
            navigation.replace('Verification');
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        {LoadingEffect && <View style={styles.Loading_effect}>
          <ImageBackground source={require("../assets/images/loading.gif")} style={styles.Loading_effect_image} />
        </View>}

        {otpSendSuccess && <View style={styles.Loading_effect}>
          <Text style={styles.Loading_effect_text_resend}>
            OTP sent again!
          </Text>
        </View>}

        {otpVerified && <View style={styles.Loading_effect}>
          <Text style={styles.Loading_effect_text}>
            OTP verification successful. Redirecting to reset password screen ...
          </Text>
        </View>}

        <ImageBackground source={require ('../assets/images/viaggi_splash_logo.png')} style={styles.ImageBackground_86_909} />

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Verification
          </Text>
          <Text style={styles.Text_87_2}>
            4 digit OTP has been sent to your mail. Enter the code below to continue
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} maxLength={1} placeholder="" keyboardType={'numeric'} onChangeText={(Otp1) => { setOtp1(Otp1);secondTextInput.current.focus(); }} blurOnSubmit={false} />
            <TextInput style={styles.TextInput_1} maxLength={1} placeholder="" keyboardType={'numeric'} ref={secondTextInput} onChangeText={(Otp2) => { setOtp2(Otp2);thirdTextInput.current.focus(); }} blurOnSubmit={false} />
            <TextInput style={styles.TextInput_1} maxLength={1} placeholder="" keyboardType={'numeric'} ref={thirdTextInput} onChangeText={(Otp3) => { setOtp3(Otp3);fourthTextInput.current.focus(); }} blurOnSubmit={false}   />
            <TextInput style={styles.TextInput_1} maxLength={1} placeholder="" onChangeText={(Otp4) => setOtp4(Otp4)} keyboardType={'numeric'} ref={fourthTextInput} />
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity style={styles.Touchable_full_cover}
              onPress={() => handleSubmitButton()}
            >
              <Text style={styles.Text_90}>
              Verify Now
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => handleResendOtp()}>
            <Text style={styles.Text_Token_resend}>
              Resend
            </Text>
          </TouchableOpacity>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Text_Token_resend: {
    width: "100%",
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Museo Slab",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 20,
    color: "#4F5454",
  },
  Touchable_full_cover: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  Loading_effect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, .90)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  Loading_effect_text: {
    fontSize: 16,
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
    width: 300,
    height: 150,
    marginTop: -40,
    marginLeft: -150,
    lineHeight: 35,
  },
  Loading_effect_text_resend: {
    fontSize: 16,
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
    width: 300,
    height: 60,
    marginTop: -40,
    marginLeft: -150,
    lineHeight: 20,
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