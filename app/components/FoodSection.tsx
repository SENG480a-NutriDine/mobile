import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, getStyles } from "../constants/styles/global";

// Will Change based off data model
interface FoodItem {
    id: number; // Unique identifier for each food item
    name: string; // Name of the food item
    description?: string; // Description of the food item (optional)
    price: number; // Price of the food item
}

interface FoodSectionProps {
    restaurantName: string;
    foodItems: FoodItem[];
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
                        key={item.id}
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
        marginBottom: 10, // Increased bottom margin for more space above the items
    },
    items: {
    },
    item: {
        width: 178,
        height: 150,
        // backgroundColor: "white",
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
        color: "#666",
    },
});


export default FoodSection;