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

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [LoadingEffect, setLoadingEffect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user_id_vg').then((value) =>
        navigation.replace(
          value !== null ? 'CreateProfile_1' : '' 
        ),
      );
    }, 100);
    // AsyncStorage.clear();
  }, []);

  const handleSubmitButton = () => {
    
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    
    var dataToSend = {
      email: userEmail,
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
    setLoadingEffect(true);

    fetch('https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/login/', {
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
        console.log("Response: ", responseJson);
        AsyncStorage.setItem('user_id_vg', responseJson.user.id);
        AsyncStorage.setItem('user_token_vg', responseJson.token);

        navigation.replace('CreateProfile_1');
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  
  const handleFbLogin = () => {
    
    
    setLoadingEffect(true);

    fetch('https://ideapros-llc-viaggi-32125.botics.co/modules/social-auth/facebook/login/', {
      method: 'POST',
      // body: JSON.stringify(newData),
      // body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoadingEffect(false);
        console.log("Response: ", responseJson);
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

        <ImageBackground source={require ('../assets/images/viaggi_splash_logo.png')} style={styles.ImageBackground_86_909} />

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Get Started
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Enter email address" onChangeText={(UserEmail) => setUserEmail(UserEmail)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.input_email_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput secureTextEntry={true} style={styles.TextInput_1} placeholder="Password" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_password_icon.png')} style={styles.input_password_icon} />
            </View>
          </View>

          <View style={styles.View_6}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              // onPress={() => navigation.navigate('Verification')}
              // onPress={() => navigation.navigate('ResetPassword')}
              // onPress={() => navigation.navigate('Onboarding_1')}
            >
              <Text style={styles.Text_88}>
              Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity style={styles.Touchable_full_cover}
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('CreateProfile_1')}
            >
              <Text style={styles.Text_90}>
              Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.View_9}>
            <View style={styles.View_8}>
            </View>
            <Text style={styles.Text_91}>
              Or
            </Text>
          </View>

          <View style={styles.View_10}>
            <TouchableOpacity style={styles.Touchable_10} 
            onPress={() => handleFbLogin()}>
                <ImageBackground source={require ('../assets/images/login_fb_icon.png')} style={styles.login_fb_icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable_10}>
              <View style={styles.View_11}>
                <ImageBackground source={require ('../assets/images/login_google_icon.png')} style={styles.login_google_icon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable_10}>
              <View style={styles.View_11}>
                <ImageBackground source={require ('../assets/images/login_apple_icon.png')} style={styles.login_apple_icon} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.View_12}>
            <Text style={styles.Text_92}>
              Don’t have an account? 
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.Text_93}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  View_6: {
    width: "90%",
    height: 20,
    alignSelf: "center",
    marginTop: -8,
    marginBottom: 50,
  },
  Text_88: {
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 20,
    color: "rgba(79, 84, 84, 0.9)",
    fontWeight: "400",
    textAlign: "right",
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
  },
  Touchable_full_cover: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
  View_8: {
    width: "98%",
    height: 1,
    alignContent: "center",
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "rgba(79, 84, 84, 0.1)",
  },
  View_9: {
    width: "98%",
    height: 40,
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  Text_91: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: 'center',
    color: '#4F5454',
    backgroundColor: "#f9faff",
    position: "relative",
    top:  -12,
    width: 50,
    height: 22,
    alignSelf: "center",
  },
  View_10: {
    width: "100%",
    height: 63,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  Touchable_10: {
    width: 65,
    height: 63,
    alignContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginRight: 8,
    marginLeft: 8,
  },
  View_11: {
    width: "100%",
    height: "100%",
  },
  login_fb_icon: {
    width: 29,
    height: 29,
    alignSelf: "center",
    marginTop: 17,
  },
  login_google_icon: {
    width: 29,
    height: 29,
    alignSelf: "center",
    marginTop: 17,
  },
  login_apple_icon: {
    width: 29,
    height: 35,
    alignSelf: "center",
    marginTop: 12,
  },
  input_email_icon: {
    width: 20,
    height: 18,
    position: "relative",
    top: 6,
    left: 5,
  },
  input_password_icon: {
    width: 17,
    height: 20,
    position: "relative",
    top:4,
    left: 6,
  },
  View_12: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 107,
  },
  Text_92: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    fontStyle: "normal",
    color: "rgba(79, 84, 84, 0.8)",
  },
  Text_93: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#F65F4D",
    marginLeft: 5,
  },
})


export default Blank