import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { colors, getStyles } from "../constants/styles/global";
import { FoodForm } from "../constants/types/types";
import { initializeFoodForm } from "../constants/objects/foodForm";
import { handleTopLevelStringChange } from "../functions/forms/formValidation";
import Dropdown from "./Dropdown";

export default function EnterFoodForm() {
  const { theme, styles } = getStyles();
  // TODO: Update based on data modelling once completed
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formState, setFormState] = useState<FoodForm>(initializeFoodForm);
  // const [restaurantDropDownVisible, setRestaurantDropDownVisible] =
  //   useState(false);

  const onSubmit = () => {
    // TODO:
    // validate all the fields
    // generate a new food.uid
    // submit the food to the database
    console.log(formState);
  };

  //TODO: Fetch all restaurants, then put label=restaurntName, value=restaurantUid
  const restaurantOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  // console.log(formState.restaurantUid);
  return (
    <View>
      {/* FOOD  */}
      <Text style={styles.formLabel}>Name</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.textInput}
            placeholderTextColor={colors[theme].placeholderText}
            placeholder="Food name"
            value={formState.name}
            onChangeText={(text) => {
              handleTopLevelStringChange("name", text, formState, setFormState);
              field.onChange(text);
            }}
          />
        )}
        name="name"
        rules={{
          required: "Please enter a food name",
          minLength: {
            value: 1,
            message: "Please enter a food name,",
          },
        }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{String(errors.name.message)}</Text>
      )}

      {/* DESCRIPTION */}
      <Text style={styles.formLabel}>Description</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.textInput}
            placeholderTextColor={colors[theme].placeholderText}
            placeholder="Food description (optional)"
            value={formState.description ?? ""}
            onChangeText={(text) => {
              handleTopLevelStringChange(
                "description",
                text,
                formState,
                setFormState
              );
              field.onChange(text);
            }}
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.errorText}>
          {String(errors.description.message)}
        </Text>
      )}

      {/* RESTAURANT */}
      <Text style={styles.formLabel}>{"Restaurant"}</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <Dropdown
            name={"restaurantUid"}
            options={restaurantOptions}
            formState={formState}
            setFormState={setFormState}
            field={field}
          />
        )}
        name="restaurantUid"
        rules={{
          required: "Please select a restaurant",
        }}
      />
      {errors.restaurant && (
        <Text style={styles.errorText}>
          {String(errors.restaurant.message)}
        </Text>
      )}

      {/* SUBMIT */}
      <Button
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        style={styles.buttonShape}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </View>
  );
}
