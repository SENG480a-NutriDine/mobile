import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { colors, getStyles } from "../constants/styles/global";
import { FoodForm } from "../constants/types/types";
import { initializeFoodForm } from "../constants/objects/foodForm";
import {
  handleNutritionalDataChange,
  handleTopLevelStringChange,
} from "../functions/forms/formValidation";
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
  //TODO: Fetch all menus once restaurant is chosen, then put label=menuName, value=menuUid
  const menuOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  console.log(typeof formState.nutritionalData.calories);
  console.log(formState.nutritionalData.calories);
  return (
    <View>
      {/* FOOD */}
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
              handleTopLevelStringChange("name", text, setFormState);
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
              handleTopLevelStringChange("description", text, setFormState);
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
      {errors.restaurantUid && (
        <Text style={styles.errorText}>
          {String(errors.restaurantUid.message)}
        </Text>
      )}

      {/* MENU */}
      <Text style={styles.formLabel}>{"Menu"}</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <Dropdown
            name={"menuUid"}
            options={menuOptions}
            formState={formState}
            setFormState={setFormState}
            field={field}
          />
        )}
        name="menuUid"
        rules={{
          required: "Please select a menu",
        }}
      />
      {errors.menuUid && (
        <Text style={styles.errorText}>{String(errors.menuUid.message)}</Text>
      )}

      {/* CALORIES */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.formLabel}>Calories</Text>
          </View>
          <View style={{ width: 100 }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: 100, ...styles.textInput }}
                  placeholderTextColor={colors[theme].placeholderText}
                  keyboardType="numeric"
                  placeholder={"500"}
                  value={
                    formState.nutritionalData.calories > 0
                      ? String(formState.nutritionalData.calories)
                      : ""
                  }
                  onChangeText={(text) => {
                    handleNutritionalDataChange("calories", text, setFormState);
                    field.onChange(text);
                  }}
                />
              )}
              name="calories"
              rules={{
                validate: {
                  validLength: (value: string) => {
                    value = value ?? "";
                    const numericalValue = Number(value.replace(/[^0-9]/g, ""));

                    if (numericalValue <= 0) {
                      return "Please enter total calories";
                    }
                  },
                },
              }}
            />
          </View>
        </View>
        {errors.calories && (
          <Text style={styles.errorText}>
            {String(errors.calories.message)}
          </Text>
        )}
      </View>

      {/* FAT */}

      {/* CARBOHYDRATES */}

      {/* PROTEIN */}

      {/* FIBER */}

      {/* ESTIMATE */}

      {/* GLUTEN FREE */}

      {/* DAIRY FREE */}

      {/* VEGETARIAN */}

      {/* VEGAN */}

      {/* FRESH FRUIT */}

      {/* FRESH VEGETABLES */}

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
