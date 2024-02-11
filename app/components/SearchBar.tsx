import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search NutriDine"
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10,
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#000',
    },
});

export default SearchBar;