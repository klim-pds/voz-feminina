import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

export default function Login({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Button
                    title="Converse com o Chat"
                    color="blue"
                    onPress={() => navigation.navigate('Chatbot')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
