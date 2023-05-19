import React from 'react';
import { View, Text, FlatList, Appearance, SafeAreaView, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { fetchNewsHeadlineData, save } from '../store/slice/newsSlice';
import { Apploading } from '../components/app.loading';
import { useIsFocused } from '@react-navigation/native';
// import AwesomeLoading from 'react-native-awesome-loading';
import colors from '../utils/colors'
let no_image = "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"

export default function Home(props) {
    const news = useSelector(state => state.headlines.news_headline);
    const isFocused = useIsFocused()
    console.log("===news value length", news?.length);
    const dispatch = useDispatch()
    const [isRefreshing, setRefresh] = React.useState(false);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    const deleteItem = (publishedAt) => {
        console.log("=====publishedAt", publishedAt);
        const updatedNews = news.filter((i) => i.publishedAt !== publishedAt);
        dispatch(save(updatedNews));
    };

    React.useEffect(() => {
        if (news?.length == 0 || !news) {
            dispatch(fetchNewsHeadlineData());
        }
    }, [news]);

    React.useEffect(() => {
        if (isFocused) {
            const timeout = setTimeout(() => {
                if (news) {
                    const shuffled_news = shuffleArray([...news.slice(10)]);
                    dispatch(save(shuffled_news));
                }
            }, 10000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [news, isFocused]);


    const callmanualUpdate = () => {
        setRefresh(true)
        const shuffled_news = shuffleArray([...news.slice(10)]);
        dispatch(save(shuffled_news));
        setRefresh(false)
    };

    const renderRightActions = () => (
        <View style={styles.deleteButton}>
            <Image style={{ width: 50, height: 50 }} source={require("../assets/delete.png")} />
        </View>
    );

    const handleSwipe = (publishedAt) => {
        deleteItem(publishedAt)
    };
    const onNewsItemClcick = (publishedAt) => {
        let filteredArr = news.filter(res => res.publishedAt == publishedAt)
        console.log("===filteredArr", filteredArr);
        props.navigation.navigate("NewsItem", filteredArr[0])
    }
    const renderItem = ({ item }) => {
        const { urlToImage, title, publishedAt, description } = item;
        return (
            <Swipeable
                onSwipeableRightOpen={() => handleSwipe(publishedAt)}
                renderRightActions={() => renderRightActions()}>
                <TouchableOpacity style={styles.container} onPress={() => onNewsItemClcick(publishedAt)}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: urlToImage ? urlToImage : no_image
                        }}
                    />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.publishedAt}>{publishedAt}</Text>
                    <Text style={styles.content}>{description}</Text>
                </TouchableOpacity>
            </Swipeable>
        );
    };


    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                {news?.length > 0 ? (
                    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <FlatList
                            data={news?.slice(0, 10)}
                            renderItem={renderItem}
                            refreshing={isRefreshing}
                            onRefresh={callmanualUpdate}
                            keyExtractor={item => item.publishedAt}
                        />
                    </SafeAreaView>
                ) : <Apploading></Apploading>}
            </GestureHandlerRootView>
        </>
    );
}


