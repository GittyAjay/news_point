import React from 'react';
import { View, Text } from 'react-native';
import AwesomeLoading from 'react-native-awesome-loading';
import colors from '../utils/colors'

export const Apploading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AwesomeLoading
            textStyle={{ color: colors.primary }}
            indicatorId={1}
            size={100}
            isActive={true}
        />
    </View>
)
