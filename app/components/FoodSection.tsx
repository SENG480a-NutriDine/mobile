import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Will Change based off data model
interface FoodItem {
    id: string; // Unique identifier for each food item
    name: string; // Name of the food item
    description?: string; // Description of the food item (optional)
    price: number; // Price of the food item
}

interface FoodSectionProps {
    restaurantName: string;
    foodItems: FoodItem[];
}

const FoodSection: React.FC<FoodSectionProps> = ({ restaurantName, foodItems }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>{restaurantName}</Text>
            <ScrollView horizontal style={styles.items} showsHorizontalScrollIndicator={false}>
                {foodItems.map(item => (
                    <View key={item.id} style={styles.item}>
                        <Text style={styles.itemHeader}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
    },
    header: {
        // fontWeight: "bold",
        fontSize: 25,
        marginBottom: 10,
    },
    items: {

    },
    item: {
        width: 150,
        height: 120,
        backgroundColor: "grey",
        borderRadius: 20,
        marginRight: 20,
        // flexDirection: "column-reverse",
        flexDirection: "column",
        padding: 10,
    },
    itemHeader: {
        fontSize: 17,
    },
    itemDescription: {
        fontSize: 12,
    }
});

export default FoodSection;