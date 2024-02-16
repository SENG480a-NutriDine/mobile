import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, getStyles } from "../constants/styles/global";
import { Food } from "../constants/types/types";

interface FoodSectionProps {
    restaurantName: string;
    foodItems: Food[];
}

const FoodSection: React.FC<FoodSectionProps> = ({ restaurantName, foodItems }) => {
    const { theme } = getStyles();

    return (
        <View style={styles.root}>
            <Text
                style={[styles.header, { color: colors[theme].text }]}
            >
                {restaurantName}
            </Text>
            <ScrollView horizontal style={styles.items} showsHorizontalScrollIndicator={false}>
                {foodItems.map(item => (
                    <View
                        key={item.uid}
                        style={[styles.item, { backgroundColor: colors[theme].secondary }]}
                    >
                        <Text
                            style={[styles.itemHeader, { color: colors[theme].text }]}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={[styles.itemDescription, { color: colors[theme].tertiary }]}
                        >
                            {item.description}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    header: {
        fontSize: 25,
        marginBottom: 10,
    },
    items: {
    },
    item: {
        width: 178,
        height: 150,
        borderRadius: 20,
        marginRight: 20,
        padding: 15,
        justifyContent: 'space-between',
    },
    itemHeader: {
        fontSize: 20,
    },
    itemDescription: {
        fontSize: 15,
    },
});


export default FoodSection;