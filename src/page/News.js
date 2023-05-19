import React from 'react';
import { View, Text, FlatList, Appearance, SafeAreaView, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { fetchNewsHeadlineData, save } from '../store/slice/newsSlice';
import { Apploading } from '../components/app.loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
let no_image = "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"

export default function Home(props) {
    const { urlToImage, title, publishedAt, content } = props.route.params;
    console.log("===props.route.params", props.route.params.content);
    const RenderItem = () => {
        return (
            <View style={styles.news_container}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: urlToImage ? urlToImage : no_image
                    }}
                />
                <Text style={[styles.title, { marginVertical: 20 }]}>{title}</Text>
                <Text style={styles.publishedAt}>{publishedAt}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        );
    };


    return (
        <>
            <SafeAreaProvider>
                <RenderItem />
            </SafeAreaProvider>
        </>
    );
}


