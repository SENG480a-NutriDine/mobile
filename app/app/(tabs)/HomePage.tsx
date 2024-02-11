import { ScrollView, SafeAreaView, View, Text, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar";
import CategorySection from "../../components/CategorySection";
import FoodSection from "../../components/FoodSection";
import { colors, getStyles } from "../../constants/styles/global";


const HomePage = () => {

    const { theme } = getStyles();

    const sampleRestaurants = [
        {
            "name": "The Gourmet Hut",
            "items": [
                { "id": 1, "name": "Truffle Pasta", "description": "Fresh pasta with truffle oil and mushrooms", "price": 15.99 },
                { "id": 2, "name": "Margherita Pizza", "description": "Classic pizza with tomatoes, mozzarella, and basil", "price": 12.99 },
                { "id": 3, "name": "Caesar Salad", "description": "Romaine lettuce with Caesar dressing and croutons", "price": 9.99 }
            ]
        },
        {
            "name": "Burger Bar",
            "items": [
                { "id": 4, "name": "Classic Cheeseburger", "description": "Beef patty with cheese, lettuce, tomato, and onion", "price": 8.99 },
                { "id": 5, "name": "Veggie Burger", "description": "Grilled plant-based patty with avocado and sprouts", "price": 9.99 },
                { "id": 6, "name": "BBQ Burger", "description": "Beef patty with BBQ sauce, bacon, and fried onions", "price": 10.99 }
            ]
        },
        {
            "name": "Sushi Corner",
            "items": [
                { "id": 7, "name": "Salmon Nigiri", "description": "Fresh salmon over sushi rice", "price": 7.99 },
                { "id": 8, "name": "California Roll", "description": "Crab, avocado, and cucumber roll", "price": 6.99 },
                { "id": 9, "name": "Tuna Sashimi", "description": "Slices of fresh tuna", "price": 9.99 }
            ]
        }
    ];

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors[theme].primary }]}>
            <View style={styles.root}>
                <View style={styles.searchBarCont}>
                    <SearchBar />
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    <CategorySection />
                    {sampleRestaurants.map((rest, index) => (
                        <FoodSection key={index.toString()} restaurantName={rest.name} foodItems={rest.items} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    root: {
        paddingTop: 30,
        paddingLeft: 30,

    },
    searchBarCont: {
        paddingRight: 30,
    },
    scrollViewStyle: {
        paddingTop: 20,
    }
});

export default HomePage;