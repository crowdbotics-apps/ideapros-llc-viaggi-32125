import React, {useState} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
const Blank = ({navigation}) => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmitButton = () => {
    // navigation.replace('LogIn');

    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    
    var dataToSend = {
      username: userEmail,
      password: userPassword,
    };
    // var newData = {
    //   username: "test_user",
    //   password: "test_user_12345"
    // }
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
      // formBody.push(key + '=' + dataToSend[key]);
    }
    formBody = formBody.join('&');
    console.log(formBody);

    fetch('https://ideapros-llc-automa-31974.botics.co/api/v1/login/', {
      method: 'POST',
      // body: JSON.stringify(newData),
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("hello");
        console.log("Response: ", responseJson);
        navigation.replace('LogIn');
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
            Forgot Password
          </Text>
          <Text style={styles.Text_87_2}>
            Please enter your email here, you will  receive a one time password
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Example@gmail.com" onChangeText={(UserEmail) => setUserEmail(UserEmail)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.ImageBackground_86_909_2} />
            </View>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              // onPress={() => handleSubmitButton()}
              onPress={() => navigation.navigate('LogIn')}
            >
              <Text style={styles.Text_90}>
              Send OTP
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
    // backgroundColor: "#E5E5E5",
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
    marginBottom: 85,
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