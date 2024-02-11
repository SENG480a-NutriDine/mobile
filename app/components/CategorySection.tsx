import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const CategorySection = () => {
    /* this will later be extracted from db maybe? */
    const categories = [
        "cat1",
        "cat2",
        "cat3",
        "cat4",
        "cat5",
        "cat6",
    ];

    return (
        <ScrollView horizontal style={styles.root} showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
                <View style={styles.item}>
                    <TouchableOpacity key={index} style={styles.category} />
                    <Text style={styles.categoryText}>{category}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
    },
    item: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: 20,
    },
    category: {
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: "100%",
    },
    categoryText: {
    },
});

export default CategorySection;
