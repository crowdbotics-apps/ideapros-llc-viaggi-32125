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
            Let’s Create your Profile
          </Text>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Your Name" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="User Name" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Enter email address" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_email_icon.png')} style={styles.input_email_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Enter phone number" onChangeText={(UserPassword) => setUserPassword(UserPassword)} />
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
              />
          </View>

          
          <View style={styles.View_7}>
            <TouchableOpacity
              // onPress={() => handleSubmitButton()}
              onPress={() => navigation.navigate('CreateProfile_3')}
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
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 14,
    color: "#4F5454",
    marginRight: 5,
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 14,
    color: "#4F5454",
    opacity: 0.6,
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