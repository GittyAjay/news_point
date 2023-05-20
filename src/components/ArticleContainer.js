import React from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../page/style';
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Apploading } from './app.loading';
import Lottie from 'lottie-react-native';
export default function Article(props) {
    const {
        onNewsItemClcick,
        handleSwipe,
        callmanualUpdate,
        news,
        isRefreshing
    } = props;
    console.log("===news items", news);
    const renderRightActions = () => (
        <View style={styles.deleteButton}>
            <Lottie style={styles.looti_img}
                source={require('../assets/delete_ani.json')}
                autoPlay loop />
        </View>
    );
    const NoImgComponent = () => (
        <Lottie
            style={{ width: 310, height: 310 }}
            source={require('../assets/no_img.json')}
            autoPlay loop />
    );
    const renderLeftActions = () => (
        <View style={styles.leftdeleteButton}>
            <Lottie style={styles.looti_img}
                source={require('../assets/delete_ani.json')}
                autoPlay loop />
        </View>
    );

    const renderItem = ({ item }) => {
        const { urlToImage, title, publishedAt, description } = item;
        return (
            <Swipeable
                renderLeftActions={() => renderLeftActions()}
                onSwipeableOpen={() => handleSwipe(publishedAt)}
                renderRightActions={() => renderRightActions()}>
                <TouchableOpacity style={styles.container} onPress={() => onNewsItemClcick(publishedAt)}>
                    {/* {loading && <Apploading />} */}
                    {!urlToImage && <View style={styles.no_img}>
                        <NoImgComponent />
                    </View>}
                    {urlToImage && <FastImage
                        style={styles.image}
                        source={{
                            uri: urlToImage
                        }}
                    />}
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
