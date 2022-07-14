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
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-date-picker'


const Blank = ({navigation}) => {
  const genders = ["Male", "Female"]

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateFormatAmPm = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    // var strTime = monthNames[month] + " " + day + "," + year;
    var strTime = year + "-" + month + "-" + day;
    return strTime;
  }

  const [LoadingEffect, setLoadingEffect] = useState(true);
  const [userDob, setUserDob] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userState, setUserState] = useState("");
  const [userCountry, setUserCountry] = useState("");
  // const userToken = "735cd18d6e50adcbc63f2b045702621b9cbe6bc5";
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);


  const handleSubmitButton = () => {
    const str_date = dateFormatAmPm(date);
    console.log("User Dob: ", str_date, userDob);
    // return;
    if (!userDob) {
      alert('Please add date of birth');
      return;
    }
    if (!userGender) {
      alert('Please add gender');
      return;
    }
    if (!userAddress) {
      alert("Please add address")
      return;
    }
    if (!userCity) {
      alert("Please add city")
      return;
    }
    if (!userZip) {
      alert("Please add zip code")
      return;
    }
    if (!userState) {
      alert("Please add state")
      return;
    }
    if (!userCountry) {
      alert("Please add country")
      return;
    }

    setLoadingEffect(true);
    
    var dataToSend = {
      "profile.dob": str_date,
      "profile.gender": userGender,
      "profile.address": userAddress,
      "profile.city": userCity,
      "profile.zip_code": userZip,
      "profile.state": userState,
      "profile.country": userCountry,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);
    // return;
    fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${userId}/`, {
      method: 'PATCH',
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
        navigation.replace('Interests');
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
          console.log("Response user details: ", responseJson);
          setUserDob(responseJson.profile.dob);
          setUserGender(responseJson.profile.gender);
          setUserAddress(responseJson.profile.address)
          setUserCity(responseJson.profile.city);
          setUserZip(responseJson.profile.zip_code);
          setUserState(responseJson.profile.state);
          setUserCountry(responseJson.profile.country);
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
        navigation.navigate('CreateProfile_2')
        } >
          <ImageBackground source={require ('../assets/images/left_arrow.png')} style={styles.back_icon} />
        </TouchableOpacity>

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Create your Profile 3
          </Text>

          <View style={styles.View_4}>

            <DatePicker modal open={open} date={date} mode="date"
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setUserDob(dateFormatAmPm(date))
                console.log("date: ", date, "user dob: ", userDob)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />

            <TouchableOpacity title="Open" onPress={() => setOpen(true)} style={styles.t_o_a_d}>
              <Text style={styles.t_o_a_d_text}>{userDob}</Text>
            </TouchableOpacity>

            {/* <TextInput style={styles.TextInput_1} placeholder="Date Of Birth" value={userDob} onChangeText={(userDob) => {setOpen(true)}} /> */}
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/calender_icon.png')} style={styles.input_calender_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setUserGender(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.a_r_s_dropdown}
              buttonTextStyle={styles.a_r_s_dropdown_text}
              defaultButtonText={userGender}
            />
            {/* <TextInput style={styles.TextInput_1} placeholder="Gender" value={userGender}  onChangeText={(UserGender) => setUserGender(UserGender)} /> */}
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
            <View style={styles.input_dropdown_gender_view}>
              <ImageBackground source={require ('../assets/images/down_arrow.png')} style={styles.input_gender_dropdown_icon} />
            </View>
          </View>

          <View style={styles.View_6}>
            <Text style={styles.Text_91}>
              Home Location
            </Text>
            <ImageBackground source={require ('../assets/images/home.png')} style={styles.home_location_icon} />
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Address" value={userAddress} onChangeText={(UserAddress) => setUserAddress(UserAddress)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="City" value={userCity} onChangeText={(UserCity) => setUserCity(UserCity)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Zipcode" value={userZip} onChangeText={(UserZip) => setUserZip(UserZip)} keyboardType={'numeric'} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="State" value={userState} onChangeText={(UserState) => setUserState(UserState)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Country" value={userCountry} onChangeText={(UserCountry) => setUserCountry(UserCountry)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('Interests')}
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
  t_o_a_d_text: {
    color: "black",
    fontSize: 13,
    backgroundColor: "white",
  },
  t_o_a_d: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 15,
    paddingLeft: 60,
  },
  a_r_s_dropdown: {
    color: "rgba(15, 4, 22, 0.5)",
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    // borderColor: "rgba(15, 31, 72, 0.1)",
    // borderWidth: 1,
    paddingTop: 0,
    paddingLeft: 18.50,
  },
  a_r_s_dropdown_text: {
    // color: "rgba(15, 4, 22, 0.5)",
    fontSize: 14,
    marginLeft: -170,
    // textAlign: "left",
    // paddingLeft: 60,
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
  input_dropdown_gender_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    right: 10,
  },
  input_gender_dropdown_icon: {
    width: 9,
    height: 6,
    position: "relative",
    top: 9,
    left: 5,
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