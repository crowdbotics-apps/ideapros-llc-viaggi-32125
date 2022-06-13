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
    // navigation.replace('MyDrawer');

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

        <TouchableOpacity onPress={() => navigation.goBack()} >
          <ImageBackground source={require ('../assets/images/left_arrow.png')} style={styles.back_icon} />
        </TouchableOpacity>

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Create your Profile 3
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Date Of Birth" onChangeText={(UserEmail) => setUserEmail(UserEmail)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/calender_icon.png')} style={styles.input_calender_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Gender" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
          </View>

          <View style={styles.View_6}>
            <Text style={styles.Text_91}>
              Home Location
            </Text>
            <ImageBackground source={require ('../assets/images/home.png')} style={styles.home_location_icon} />
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="City" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Zipcode" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="State" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Country" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              // onPress={() => handleSubmitButton()}
              onPress={() => navigation.navigate('Interests')}
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
  input_calender_icon: {
    width: 16,
    height: 18,
    position: "relative",
    top: 5,
    left: 5,
  },
  input_user_icon: {
    width: 14.6,
    height: 18.3,
    position: "relative",
    top:4,
    left: 6,
  },
  input_location_icon: {
    width: 12,
    height: 18,
    position: "relative",
    top:4,
    left: 6,
  },
  profile_icon_upload_picture: {
    width: 108,
    height: 135,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -67,
    marginLeft: -54,
    opacity: .7,
  },
  View_5: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    color: "#4F5454",
    marginBottom: 10,
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 12,
    color: "rgba(79, 84, 84, 0.7)",
    marginBottom: 144,
  },
  View_6: {
    width: "90%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  Text_91: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 30,
    color: "#4F5454",
    opacity: .9,
  },
  home_location_icon: {
    width: 19,
    height: 19,
    marginTop: 2,
    marginLeft: 10,
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