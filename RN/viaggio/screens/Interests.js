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
            Your Interests
          </Text>
          
          <Text style={styles.Text_88}>
            Please select your preferred Points Of Interest
          </Text>

          <View style={styles.View_4_interest_wrapper}>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper}>
                <ImageBackground source={require ('../assets/images/interest_hotel.png')} style={styles.interest_icon} />
              </View>
              <Text style={styles.Text_89}>
                Hotels
              </Text>
            </View>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper_2}>
                <ImageBackground source={require ('../assets/images/interest_food.png')} style={styles.interest_icon_2} />
              </View>
              <Text style={styles.Text_89}>
                Restaurants
              </Text>
            </View>
            
          </View>

          <View style={styles.View_4_interest_wrapper}>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper_3}>
                <ImageBackground source={require ('../assets/images/interest_cocktail.png')} style={styles.interest_icon_3} />
              </View>
              <Text style={styles.Text_89}>
                Hotels
              </Text>
            </View>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper_4}>
                <ImageBackground source={require ('../assets/images/interest_shopping.png')} style={styles.interest_icon_4} />
              </View>
              <Text style={styles.Text_89}>
                Restaurants
              </Text>
            </View>
            
          </View>

          <View style={styles.View_4_interest_wrapper}>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper_5}>
                <ImageBackground source={require ('../assets/images/interest_other_pois.png')} style={styles.interest_icon_5} />
              </View>
              <Text style={styles.Text_89}>
                Hotels
              </Text>
            </View>

            <View style={styles.View_4_interest}>
              <View style={styles.View_4_interest_image_wrapper_6}>
                <ImageBackground source={require ('../assets/images/interest_all_pois.png')} style={styles.interest_icon_6} />
              </View>
              <Text style={styles.Text_89}>
                Restaurants
              </Text>
            </View>
            
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              // onPress={() => handleSubmitButton()}
              onPress={() => navigation.navigate('Location')}
            >
              <Text style={styles.Text_90}>
                Get Started
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
    fontSize: 20,
    lineHeight: 30,
    color: "#1E6AFF",
    alignContent: "center",
    textAlign: "center",
    opacity: .9,
    marginBottom: 10,
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 20,
    color: "#4F5454",
    opacity: .7,
    textAlign: "center",
    marginBottom: 54
  },
  View_4_interest_wrapper: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 34,
  },
  View_4_interest: {
    width: 130,
    height: 152,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(246, 95, 77, 0.84)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.85,
    shadowRadius: 10.84,
    elevation: 15,
    marginLeft: 11,
    marginRight: 11,
  },
  View_4_interest_image_wrapper: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(236, 218, 255, .5)",
    borderRadius: 36,
  },
  View_4_interest_image_wrapper_2: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(255, 196, 173, .5)",
    borderRadius: 36,
  },
  View_4_interest_image_wrapper_3: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(255, 197, 201, .5)",
    borderRadius: 36,
  },
  View_4_interest_image_wrapper_4: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(173, 245, 255, .5)",
    borderRadius: 36,
  },
  View_4_interest_image_wrapper_5: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(151, 245, 255, .5)",
    borderRadius: 36,
  },
  View_4_interest_image_wrapper_6: {
    width: 73,
    height: 73,
    backgroundColor: "rgba(255, 177, 183, .5)",
    borderRadius: 36,
  },
  interest_icon: {
    width: 54,
    height: 54,
    alignSelf: "center",
    marginTop: 7,
  },
  interest_icon_2: {
    width: 56,
    height: 56,
    alignSelf: "center",
    marginTop: 9,
  },
  interest_icon_3: {
    width: 48,
    height: 48,
    alignSelf: "center",
    marginTop: 13,
  },
  interest_icon_4: {
    width: 46,
    height: 46,
    alignSelf: "center",
    marginTop: 14,
  },
  interest_icon_5: {
    width: 44,
    height: 44,
    alignSelf: "center",
    marginTop: 15,
  },
  interest_icon_6: {
    width: 25.38,
    height: 13.73,
    alignSelf: "center",
    marginTop: 29,
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 16,
    color: "#4F5454",
    marginTop: 16,
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