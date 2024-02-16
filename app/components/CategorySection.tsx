import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, getStyles } from "../constants/styles/global";

const CategorySection = () => {
    const { theme } = getStyles();

    /* this will later be extracted from db maybe? */
    const categories = [
        "High-Protein",
        "Low-Calorie",
        "Vegan",
        "Vegitarian",
        "Gluten-Free",
        "Dairy-Free",
        "Fresh-Veggies",
        "Fresh-Fruit",
    ];

    return (
        <ScrollView horizontal style={styles.root} showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
                <View key={index} style={styles.item}>
                    <View
                        style={[styles.category, { backgroundColor: colors[theme].secondary }]}
                    />
                    <Text
                        style={[styles.categoryText, { color: colors[theme].text }]}
                    >
                        {category}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        // paddingTop: 10,
        // paddingBottom: 30,
        paddingVertical: 10,
    },
    item: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: 20,
    },
    category: {
        padding: 40,
        borderRadius: 100,
    },
    categoryText: {
        marginTop: 10,
    },
});

export default CategorySection;
