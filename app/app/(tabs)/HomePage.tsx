import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import SearchBar from '../../components/SearchBar';
import CategorySection from '../../components/CategorySection';
import FoodSection from '../../components/FoodSection';
import { colors, getStyles } from '../../constants/styles/global';
import useRestaurants from '../../custom/hooks/useRestaurants';
import useFoodItems from '../../custom/hooks/useFoodItems';

const HomePage = () => {
    const { theme } = getStyles();

    const { restaurants, restaurantsAreLoading } = useRestaurants();
    const { foodItems, foodItemsAreLoading } = useFoodItems();

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors[theme].primary }]}
        >
            <View style={styles.root}>
                <View style={styles.searchBarCont}>
                    <SearchBar />
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    <CategorySection />
                    {!restaurantsAreLoading && restaurants.map((rest, index) => (
                        <FoodSection
                            key={index.toString()}
                            restaurantName={rest.name}
                            foodItems={foodItems.filter(item => item.restaurantUid === rest.uid)}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

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
        paddingBottom: 10,
    },
    scrollViewStyle: {
        paddingBottom: 90,
    }
});

export default HomePage;
