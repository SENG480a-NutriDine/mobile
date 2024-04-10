import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { colors, getStyles } from "../constants/styles/global";

const SearchBar = () => {
    const { theme } = getStyles();

    return (
        <View
            style={[styles.container, { backgroundColor: colors[theme].searchBarBackground }]}
        >
            <TextInput
                placeholder="Search NutriDine"
                style={[styles.input, { color: colors[theme].text }]}
                placeholderTextColor={colors[theme].searchBarPlaceholderText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 20,
        paddingLeft: 10,
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default SearchBar;