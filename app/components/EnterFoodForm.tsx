import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";

export default function EnterFoodForm() {
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
            style={styles.textInput}
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
        buttonColor="#264653"
        textColor="white"
        mode="contained"
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </View>
  );
  {
  }
}

const styles = StyleSheet.create({
  formLabel: {
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  submitButton: {
    borderRadius: 10,
    borderWidth: 1,
  },
  errorText: {
    color: "red",
  },
});
