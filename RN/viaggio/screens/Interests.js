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

  const [userInterests, setUserInterests] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [hotelAddedInterests, setHotelAddedInterests] = useState(false);
  const [restaurantAddedInterests, setRestaurantAddedInterests] = useState(false);
  const [barsAddedInterests, setBarsAddedInterests] = useState(false);
  const [shoppingAddedInterests, setShoppingAddedInterests] = useState(false);
  const [otherPOIsAddedInterests, setOtherPOIsAddedInterests] = useState(false);
  const [allPOIsAddedInterests, setAllPOIsAddedInterests] = useState(false);
  let user_selected_interests = ["Hotels", "Restaurants", "Shopping", "Other POIs"];
  const [LoadingEffect, setLoadingEffect] = useState(true);


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
          // console.log("Response user profile: ", responseJson.profile.interests, typeof(responseJson.profile.interests), responseJson.profile.interests.length );
          if(responseJson.profile.interests.length > 0){
            for (let i = 0; i < responseJson.profile.interests.length; i++) {
              if(responseJson.profile.interests[i] === "Hotels"){
                setHotelAddedInterests(true);
              }
              if(responseJson.profile.interests[i] === "Restaurants"){
                setRestaurantAddedInterests(true);
              }
              if(responseJson.profile.interests[i] === "Bars"){
                setBarsAddedInterests(true);
              }
              if(responseJson.profile.interests[i] === "Shopping"){
                setShoppingAddedInterests(true);
              }
              if(responseJson.profile.interests[i] === "Other POIs"){
                setOtherPOIsAddedInterests(true);
              }
            }
          }
          })
        .catch((error) => {
          console.error(error);
        });
      setLoadingEffect(false);
    }
    storage()


  }, [])



  const handleSubmitButton = () => {
    
    if (!hotelAddedInterests && !restaurantAddedInterests && !barsAddedInterests && !shoppingAddedInterests && !otherPOIsAddedInterests) {
      alert('No interests selected');
      return;
    }
    setLoadingEffect(true);

    let formdata = new FormData();

    if (hotelAddedInterests) {
      formdata.append("profile.interests", 'Hotels');
    }
    if (restaurantAddedInterests) {
      formdata.append("profile.interests", 'Restaurants');
    }
    if (barsAddedInterests) {
      formdata.append("profile.interests", 'Bars');
    }
    if (shoppingAddedInterests) {
      formdata.append("profile.interests", 'Shopping');
    }
    if (otherPOIsAddedInterests) {
      formdata.append("profile.interests", 'Other POIs');
    }
    if (allPOIsAddedInterests) {
      formdata.append("profile.interests", 'All');
    }

    fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${userId}/`, {
      method: 'PATCH',
      body: formdata,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${userToken}`,
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log("Response: ", responseJson);

        navigation.replace('Location');
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

        <TouchableOpacity onPress={() => 
        // navigation.goBack()
        navigation.navigate('CreateProfile_3')
        } >
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

            <TouchableOpacity style={[styles.View_4_interest, hotelAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setHotelAddedInterests(!hotelAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper}>
                <ImageBackground source={require ('../assets/images/interest_hotel.png')} style={styles.interest_icon} />
              </View>
              <Text style={styles.Text_89}>
                Hotels
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.View_4_interest, restaurantAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setRestaurantAddedInterests(!restaurantAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper_2}>
                <ImageBackground source={require ('../assets/images/interest_food.png')} style={styles.interest_icon_2} />
              </View>
              <Text style={styles.Text_89}>
                Restaurants
              </Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.View_4_interest_wrapper}>

            <TouchableOpacity style={[styles.View_4_interest, barsAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setBarsAddedInterests(!barsAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper_3}>
                <ImageBackground source={require ('../assets/images/interest_cocktail.png')} style={styles.interest_icon_3} />
              </View>
              <Text style={styles.Text_89}>
                Bars
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.View_4_interest, shoppingAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setShoppingAddedInterests(!shoppingAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper_4}>
                <ImageBackground source={require ('../assets/images/interest_shopping.png')} style={styles.interest_icon_4} />
              </View>
              <Text style={styles.Text_89}>
                Shopping
              </Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.View_4_interest_wrapper}>

            <TouchableOpacity style={[styles.View_4_interest, otherPOIsAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setOtherPOIsAddedInterests(!otherPOIsAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper_5}>
                <ImageBackground source={require ('../assets/images/interest_other_pois.png')} style={styles.interest_icon_5} />
              </View>
              <Text style={styles.Text_89}>
                Other POIs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.View_4_interest, allPOIsAddedInterests ? styles.View_4_interest_updated : styles.View_4_interest]} onPress={()=>setAllPOIsAddedInterests(!allPOIsAddedInterests)} >
              <View style={styles.View_4_interest_image_wrapper_6}>
                <ImageBackground source={require ('../assets/images/interest_all_pois.png')} style={styles.interest_icon_6} />
              </View>
              <Text style={styles.Text_89}>
                All POI’s
              </Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('Location')}
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
  View_4_interest_updated: {
    backgroundColor: "lightcoral",
    shadowColor: "black",
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