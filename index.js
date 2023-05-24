import { AppRegistry, Text, View } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import { store } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Apploading } from './src/components/app.loading';
import { RealmProvider } from './realm'
let persistor = persistStore(store);
const AppWithProvider = () => (
    <RealmProvider>
        <Provider store={store}>
            <PersistGate loading={<Apploading />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </RealmProvider>
);
AppRegistry.registerComponent(appName, () => AppWithProvider);
