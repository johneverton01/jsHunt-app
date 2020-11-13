import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header({title, showCancel = true}: HeaderProps) {
    const navigation = useNavigation();

    function handleGoBackToHome() {
        navigation.navigate('JSHunter');
    }

    return(
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#fff" />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToHome}>
                <Feather name="x" size={24} color="#ff669c" />
            </BorderlessButton>
            ) : (
                <View/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#DA552F',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold"
    },
})