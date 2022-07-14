import React, {useEffect, useState} from "react"
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

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBio, setUserBio] = useState("");
  const [LoadingEffect, setLoadingEffect] = useState(true);
  // const userToken = "735cd18d6e50adcbc63f2b045702621b9cbe6bc5";
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleSubmitButton = () => {
    
    if (!name) {
      alert('Please fill name');
      return;
    }
    if (!userName) {
      alert('Please fill user name');
      return;
    }
    if (!userEmail) {
      alert('Please fill email');
      return;
    }
    if (!userPhone) {
      alert('Please fill phone number');
      return;
    }
    if (!userBio) {
      alert('Please fill bio');
      return;
    }
    setLoadingEffect(true);
    
    var dataToSend = {
      name: name,
      username: userName,
      email: userEmail,
      "profile.phone": userPhone,
      "profile.bio": userBio,
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

    fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${userId}/`, {
      method: 'PATCH',
      // body: JSON.stringify(newData),
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Token ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("hello");
        console.log("Response: ", responseJson);
        setLoadingEffect(false);
        navigation.replace('CreateProfile_3');
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  useEffect(() => {
    const storage = async()=>{
      let user_token = await AsyncStorage.getItem("user_token_vg");
      let user_id = await AsyncStorage.getItem("user_id_vg");
      console.log("User token: ", user_token)
      setUserToken(user_token);
      console.log("User id: ", user_id)
      setUserId(user_id);
      fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${user_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Token ${user_token}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Response all vehicle: ", responseJson);
          setName(responseJson.first_name);
          setUserName(responseJson.name);
          setUserEmail(responseJson.email);
          setUserPhone(responseJson.profile.phone);
          setUserBio(responseJson.profile.bio);
          })
        .catch((error) => {
          console.error(error);
        });
        setLoadingEffect(false);
    }
    storage()

  }, [])


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        {LoadingEffect && <View style={styles.Loading_effect}>
          <ImageBackground source={require("../assets/images/loading.gif")} style={styles.Loading_effect_image} />
        </View>}

        <TouchableOpacity onPress={() => 
        // navigation.goBack()
        navigation.navigate('CreateProfile_1')
        } >
          <ImageBackground source={require ('../assets/images/left_arrow.png')} style={styles.back_icon} />
        </TouchableOpacity>

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Create your Profile
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Your Name" value={name} onChangeText={(name) => setName(name)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="User Name" value={userName} onChangeText={(UserName) => setUserName(UserName)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Enter email address" value={userEmail} onChangeText={(UserEmail) => setUserEmail(UserEmail)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.input_email_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Enter phone number" value={userPhone} onChangeText={(UserPhone) => setUserPhone(UserPhone)} keyboardType={'numeric'} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/phone_icon.png')} style={styles.input_phone_icon} />
            </View>
          </View>

          <View style={styles.View_8_c_p}>
            <Text style={styles.Text_88}>
              Note: 
            </Text>
            <Text style={styles.Text_89}>
              Mobile Telephone Number will allow you and your friends to easily find each other to share your experiences. Information will not be displayed to other users.
            </Text>
          </View>

          <View style={styles.View_4_bio}>
            <TextInput style={styles.TextInput_bio} 
              placeholder="Write your bio..."
              multiline={true}
              numberOfLines={10}
              onChangeText={(UserBio) => setUserBio(UserBio)}
              value={userBio}
              maxLength={200}
              />
          </View>

          
          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('CreateProfile_3')}
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
  back_icon:{
    width: 8,
    height: 14.22,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 36,
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
  View_4_bio: {
    width: "90%",
    height: "auto",
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
  TextInput_bio: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 12,
    height:200, 
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 11,
    lineHeight: 20,
    color: '#4F5454',
  },
  input_icon_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    left: 10,
  },
  input_user_icon: {
    width: 14.6,
    height: 18.3,
    position: "relative",
    top:4,
    left: 6,
  },
  input_email_icon: {
    width: 20,
    height: 18,
    position: "relative",
    top: 6,
    left: 5,
  },
  input_phone_icon:{
    width: 17,
    height: 17,
    position: "relative",
    top: 6,
    left: 5,
  },
  View_8_c_p: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 14,
    color: "#4F5454",
    // marginRight: 5,
    // backgroundColor: "green",
    width: "10%",
    textAlign: "center",
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 14,
    color: "#4F5454",
    opacity: 0.6,
    paddingLeft: 5,
    // backgroundColor: "blue",
    overflow: "hidden",
    width: "90%",
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 42,
    marginBottom: 20,
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