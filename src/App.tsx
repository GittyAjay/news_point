import React from 'react';
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsHeadlineData, save } from './store/slice/newsSlice';
import AppNavigation from './route'
export default function App() {

  const news = useSelector(state => state.headlines.news_headline);
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (news?.length == 0 || !news) {
      dispatch(fetchNewsHeadlineData());
    }
  }, [news]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#f4511e" />
      <AppNavigation />
    </>
  );
}


