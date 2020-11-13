import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface ProductsParams {
    product: {
        _id: string;
        title: string;
        description: string;
        url: string
    }

}

export default function Products(){

    const route = useRoute();
    const navigation = useNavigation();

    const params = route.params as ProductsParams;
    navigation.setOptions({title: params.product.title});

    return(
        <WebView source={{uri: params.product.url}} />
    )
}

