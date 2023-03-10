import React, { useEffect, useState } from 'react';
import {
    View,
    Text, Image,
    TouchableOpacity,
    ImageBackground, ActivityIndicator,
    StatusBar, ScrollView, FlatList, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoaderKit from 'react-native-loader-kit';
import { images, icons, COLORS, FONTS, SIZES } from "../../../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginHanlder } from '../../../store/redux/userLogin';
import SearchScreen from './searchScreen';
import CourseList from './courseListSearch';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { courseListHandler } from '../../../store/redux/courseList';
import { cartHandler } from '../../../store/redux/cart';
import { useIsFocused } from "@react-navigation/core";
import NetInfo from '@react-native-community/netinfo';


const Search = ({ navigation }) => {
    // console.log("iam inside search", Token);
    //  console.log("iam inside search");
    const dispatch = useDispatch();
    const Token = useSelector((state) => state.loginHandle.data)
    const allCourses = useSelector((state) => state.courseList.data.data)
    const [wishListed,setWishListed]=useState([false]);
    const cartData = useSelector((state) => state.cartList.data.data)
    const [isSearchLoader, setIsSearchLoader] = useState(false);
    const cartCount= useSelector((state) => state.cartList.data.data);
    //console.log(allCourses, "isSearchLoader")
    const [Data, setData] = useState([]);
    const [network, setNetwork] = useState('')
    const [totalValue, setTotalValue] = useState(0);
    const isFocused = useIsFocused();

    // console.log("Network connection ",network);
    useEffect(() => {
        if (isFocused) {
        setIsSearchLoader(true);
            NetInfo.refresh().then(state => {
                setNetwork(state.isConnected)
                if (state.isConnected) {
                    initialLoading();
                    
                }
                else {
                setIsSearchLoader(false);
                    navigation.navigate("NetworkError");
                }
            })
            // console.log("done n search")
            
            const initialLoading = async () => {
                let token = await AsyncStorage.getItem("loginToken");
                if (token) {
                    dispatch(cartHandler(token)).then(unwrapResult)
                        .then((originalPromiseResult) => {
                            // console.log("CartList............. ", originalPromiseResult)
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            // console.log(" cart List failed Inside catch", rejectedValueOrSerializedError);
                        })
                    dispatch(userLoginHanlder(token)).then(unwrapResult)
                        .then((originalPromiseResult) => {
                            // console.log("User lists........... ", originalPromiseResult);
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            // console.log(" Inside catch", rejectedValueOrSerializedError);
                        })
                }
                // console.log("Search.............................")
                dispatch(courseListHandler(token)).then(unwrapResult)
                    .then((originalPromiseResult) => {
                        // console.log("successfully returned to login with response CourseList ", )
                        setIsSearchLoader(false);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        // console.log(" course list failed Inside catch", rejectedValueOrSerializedError);
                        setIsSearchLoader(false);
                    })
                   

            }

        }

    }, [isFocused, network])


    // useEffect(() => {
    //     console.log(cartData?.data, "cartData");
    //     if (Token) {
    //         console.log(cartData, "cartData2");
    //         if (cartData) {
    //             let cartValue = 0
    //             let course = cartData.Courses;
    //             console.log(course, "course detail")
    //             setData(cartData);
    //             for (let i = 0; i < course.length; i++) {
    //                 cartValue = cartValue + course[i].enrollmentFee;

    //             }
    //             setTotalValue(cartValue);
    //         }
    //     }
    //     // console.log("Log cart details length ",(cartData.Courses).length);
    // }, [cartData])


    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
              <StatusBar
                        animated={true}
                        backgroundColor={COLORS.primary}
                    />
            {
                (!allCourses || isSearchLoader) ?
                    <View style={{ height: "100%", width: "100%", }}>
                        <ImageBackground source={images.LoginBgImage} resizeMode="repeat" style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                            <LoaderKit
                                style={{ width: 50, height: 50 }}
                                name={'BallPulse'} // Optional: see list of animations below
                                size={50} // Required on iOS
                                color={COLORS.primary} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                            />
                        </ImageBackground>
                    </View> :
                    <View style={{ height: "100%", width: "100%", zIndex: 20, position: 'absolute', }}>
                        <View style={{ height: "11%", width: "100%", }}>
                            <SearchScreen isSearchLoader={isSearchLoader} setIsSearchLoader={setIsSearchLoader} cartCount={cartCount} />
                        </View>
                        <View style={{ width: "100%", paddingBottom: "6%", zIndex: -10, height: "92%" }}>
                            {/* {console.log("carrrrrrarrt", wishListed)} */}
                 
                            <CourseList allCourses={allCourses} cartData={cartData}  />
                        </View>
                    </View>
            }

        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
    },
    listItem: {
        flex: 1,
        marginTop: ".5%",
        padding: 22,
        backgroundColor: COLORS.white,
        width: '100%',
        flexDirection: 'row',
        height: 130,
        lineHeight: "1.5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderColor: "#FFF",
        paddingTop: 2,
        borderWidth: 1,
        borderRadius: 10,
    },
});
export default Search;