import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsHeadlineData, save } from '../store/slice/newsSlice';
import { useIsFocused } from '@react-navigation/native';
import Article from '../components/ArticleContainer'
import realm, { useQuery } from '../../realm'
export default function Home(props) {
    const profiles = useQuery(realm);
    const news = useSelector(state => state.headlines.news_headline);
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [isRefreshing, setRefresh] = React.useState(false);

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

    const callmanualUpdate = () => {
        setRefresh(true)
        const shuffled_news = shuffleArray([...news.slice(10)]);
        dispatch(save(shuffled_news));
        setRefresh(false)
    };

    const handleSwipe = (publishedAt) => {
        deleteItem(publishedAt)
    };

    const onNewsItemClcick = (publishedAt) => {
        let filteredArr = news.filter(res => res.publishedAt == publishedAt)
        props.navigation.navigate("NewsItem", filteredArr[0])
    }

    return (
        <>
            <Article
                onNewsItemClcick={onNewsItemClcick}
                handleSwipe={handleSwipe}
                isRefreshing={isRefreshing}
                callmanualUpdate={callmanualUpdate}
                shuffleArray={shuffleArray}
                news={news}
            />
        </>
    );
}


