import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LoaderKit from 'react-native-loader-kit';
import { images, icons, COLORS, FONTS, SIZES } from "../../constants";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Colors } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const NoNetworkError = () => {
    const navigation = useNavigation();
    // const isFocused = useIsFocused();
    // useEffect(()=>{
    const unsubscribe = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                navigation.goBack();
            }
            else{
                alert("Please Check your network connection!");
            }
        })
    }
    // unsubscribe();
    // }, [isFocused])

    return (
        <>
            {/* <View style={{ flexDirection: "row", alignItems: "center", color: COLORS.black, backgroundColor: COLORS.primary, height: "8%" , borderBottomStartRadius: 30, borderBottomEndRadius: 30}}>
                <TouchableOpacity style={{ marginLeft: "4%" }} onPress={()=>navigation.goBack()}>
                    <MCIcon name="keyboard-backspace" size={RFValue(20)} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={{ color: COLORS.white, marginLeft: "2%", fontSize: RFValue(18), ...FONTS.robotoregular }}>Cart</Text>
            </View> */}
            <KeyboardAvoidingView style={styles.mainContainer}>
                <Image source={images.noNetworkGif} resizeMode="contain" style={{ height: 200, width: 200 }} />
                <View style={{ width: "80%", margin: "5%", alignItems: "center" }}>
                    <Text style={{ color: COLORS.black, fontSize: RFValue(16), ...FONTS.robotoregular, textAlign: "center" }}>Something Went Wrong {"\n"}Please Check your internet connection</Text>
                </View>
                <TouchableOpacity onPressIn={() => unsubscribe()} >
                    <Text style={{ ...FONTS.robotoregular, color: "red", textDecorationLine: "underline" }}>Reload...</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 0
    }

});
export default NoNetworkError;