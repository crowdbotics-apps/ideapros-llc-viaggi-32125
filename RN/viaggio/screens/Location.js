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

  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");

  const handleSubmitButton = () => {

    console.log("Location Updated: ")
    
    return;
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userPassword) {
    //   alert('Please fill Password');
    //   return;
    // }
    
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
            Enable Location
          </Text>
          
          <Text style={styles.Text_88}>
            Allow us to access your current location so we can better anticipate what you are looking for. You can always change it later
          </Text>

          <ImageBackground source={require ('../assets/images/location_big_canvas.png')} style={styles.location_big_canvas} />

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('CreateProfile_2')}
            >
              <Text style={styles.Text_90}>
                Allow Location
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.Text_88_dont_allow} onPress={() => navigation.goBack()} >
            Don't Allow
          </Text>

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
    fontSize: 20,
    lineHeight: 30,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .9,
    marginBottom: 10,
  },
  Text_88: {
    width: "80%",
    height: "auto",
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 20,
    color: "#4F5454",
    opacity: .7,
    textAlign: "center",
    marginBottom: 54,
    alignSelf: "center",
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 42,
    marginBottom: 15,
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
  Text_88_dont_allow: {
    width: "80%",
    height: "auto",
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 24,
    color: "#4F5454",
    opacity: .7,
    textAlign: "center",
    marginBottom: 54,
    alignSelf: "center",
  },
  location_big_canvas: {
    width: 370,
    height: 337,
    alignSelf: "center",
  },
})


export default Blank