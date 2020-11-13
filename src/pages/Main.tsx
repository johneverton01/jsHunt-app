import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Products {
    _id: string,
    title: string,
    description: string,
    url: string,
}

interface ProductsInfo {
    total: number,
    limit: number,
    page: number,
    pages: number,
}

export default function Main(props:any) {

    const [products, setProducts] = useState<Products[]>([]);
    const [page, setPage] = useState<number>(1);
    const [productInfo, setProductsInfo] = useState<any>();
    const navigation = useNavigation();

    useEffect(() => {
        loadProducts(page)
    }, [page]);

    async function loadProducts (currentPage:number){
        const response = await api.get(`/products?page=${currentPage}`)
        const {docs, ...productsInfo} = response.data;
        const arrDocs = [...products, ...docs]
        setProducts(arrDocs);
        setProductsInfo(productsInfo);
        setPage(currentPage);

    }

    function loadMore(){

       if(page === productInfo.pages) {
           return
       }

        const pageNumber = page + 1;
        loadProducts(pageNumber);
    }

    return (
        <View style={styles.container}>
           <FlatList
           contentContainerStyle={styles.list}
            data={products}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
                <View style={styles.productContainer}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <TouchableOpacity style={styles.productButton}
                        onPress={() => {
                            navigation.navigate('Products', { product: item })
                        }}
                    >
                        <Text style={styles.productButtonText}>Acessar</Text>
                    </TouchableOpacity>
                </View>
            )}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding:20,
    },

    productContainer: {
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },

    productButton: {
        height: 42,
        borderRadius:5,
        borderWidth: 2,
        borderColor: "#da552f",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    productButtonText: {
        fontSize:16,
        color: "#da552f",
        fontWeight: 'bold',
    }
});