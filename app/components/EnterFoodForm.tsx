import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { getStyles } from "../constants/styles/global";

export default function EnterFoodForm() {
  const { theme, styles } = getStyles();

  // TODO: Update based on data modelling once completed
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formState, setFormState] = useState({ foodName: "" });

  const handleFoodNameChange = (text: string) => {
    setFormState({ foodName: text });
  };

  const onSubmit = () => {
    console.log("Submitted food name:", formState.foodName);
  };

  return (
    <View>
      <Text style={styles.formLabel}>Food Name</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.buttonShape}
            placeholder="Enter food name"
            value={formState.foodName}
            onChangeText={(text) => {
              handleFoodNameChange(text);
              field.onChange(text);
            }}
          />
        )}
        name="foodName"
        rules={{
          required: "Please enter a food name",
          minLength: {
            value: 1,
            message: "Food name must have a length of at least 1",
          },
        }}
      />
      {errors.foodName && (
        <Text style={styles.errorText}>{String(errors.foodName.message)}</Text>
      )}

      <Button
        buttonColor="#264653" // TODO: Update to use themeCustomHook
        textColor="white" // TODO: Update to use themeCustomHook
        mode="contained"
        style={styles.buttonShape}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </View>
  );
}
