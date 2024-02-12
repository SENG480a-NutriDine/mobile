import React, { useState } from "react";
import { View, TextInput, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { colors, getStyles } from "../constants/styles/global";
import { FoodForm } from "../constants/types/types";
import { initializeFoodForm } from "../constants/objects/foodForm";
import {
  handleNutritionalDataChange,
  handleTopLevelStringChange,
} from "../functions/forms/formValidation";
import FormDropdown from "./FormDropdown";
import FormSwitch from "./FormSwitch";

export default function EnterFoodForm() {
  const { theme, styles } = getStyles();
  // TODO: Update based on data modelling once completed
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();
  const [formState, setFormState] = useState<FoodForm>(initializeFoodForm);

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

  return (
    <ScrollView
      style={{
        width: "100%",
        maxWidth: 350,
      }}
    >
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
          <FormDropdown
            name={"restaurantUid"}
            options={restaurantOptions}
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
          <FormDropdown
            name={"menuUid"}
            options={menuOptions}
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

      {/* ESTIMATE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Estimated Nutritional Values?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="isEstimate"
                field={field}
                setFormState={setFormState}
              />
            )}
            name="isEstimate"
          />
        </View>
      </View>

      {/* CALORIES */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={styles.formLabel}>Calories</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: "50%", ...styles.textInput }}
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
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={styles.formLabel}>Fat (g)</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: "50%", ...styles.textInput }}
                  placeholderTextColor={colors[theme].placeholderText}
                  keyboardType="numeric"
                  placeholder={"5g"}
                  value={
                    formState.nutritionalData.fat.quantity > 0
                      ? String(formState.nutritionalData.fat.quantity)
                      : ""
                  }
                  onChangeText={(text) => {
                    handleNutritionalDataChange("fat", text, setFormState);
                    field.onChange(text);
                  }}
                />
              )}
              name="fat"
              rules={{
                validate: {
                  validLength: (value: string) => {
                    value = value ?? "";
                    const numericalValue = Number(value.replace(/[^0-9]/g, ""));

                    if (numericalValue <= 0) {
                      return "Please enter total fat in grams";
                    }
                  },
                },
              }}
            />
          </View>
        </View>
        {errors.fat && (
          <Text style={styles.errorText}>{String(errors.fat.message)}</Text>
        )}
      </View>

      {/* CARBOHYDRATES */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={styles.formLabel}>Carbohydrates (g)</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: "50%", ...styles.textInput }}
                  placeholderTextColor={colors[theme].placeholderText}
                  keyboardType="numeric"
                  placeholder={"30g"}
                  value={
                    formState.nutritionalData.carbohydrates.quantity > 0
                      ? String(formState.nutritionalData.carbohydrates.quantity)
                      : ""
                  }
                  onChangeText={(text) => {
                    handleNutritionalDataChange(
                      "carbohydrates",
                      text,
                      setFormState
                    );
                    field.onChange(text);
                  }}
                />
              )}
              name="carbohydrates"
              rules={{
                validate: {
                  validLength: (value: string) => {
                    value = value ?? "";
                    const numericalValue = Number(value.replace(/[^0-9]/g, ""));

                    if (numericalValue <= 0) {
                      return "Please enter total carbohydrates in grams";
                    }
                  },
                },
              }}
            />
          </View>
        </View>
        {errors.carbohydrates && (
          <Text style={styles.errorText}>
            {String(errors.carbohydrates.message)}
          </Text>
        )}
      </View>

      {/* PROTEIN */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={styles.formLabel}>Protein (g)</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: "50%", ...styles.textInput }}
                  placeholderTextColor={colors[theme].placeholderText}
                  keyboardType="numeric"
                  placeholder={"18g"}
                  value={
                    formState.nutritionalData.protein.quantity > 0
                      ? String(formState.nutritionalData.protein.quantity)
                      : ""
                  }
                  onChangeText={(text) => {
                    handleNutritionalDataChange("protein", text, setFormState);
                    field.onChange(text);
                  }}
                />
              )}
              name="protein"
              rules={{
                validate: {
                  validLength: (value: string) => {
                    value = value ?? "";
                    const numericalValue = Number(value.replace(/[^0-9]/g, ""));

                    if (numericalValue <= 0) {
                      return "Please enter total protein in grams";
                    }
                  },
                },
              }}
            />
          </View>
        </View>
        {errors.protein && (
          <Text style={styles.errorText}>{String(errors.protein.message)}</Text>
        )}
      </View>

      {/* FIBER */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={styles.formLabel}>Fiber (g)</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={{ width: "50%", ...styles.textInput }}
                  placeholderTextColor={colors[theme].placeholderText}
                  keyboardType="numeric"
                  placeholder={"10g"}
                  value={
                    formState.nutritionalData.fiber?.quantity ?? 0 > 0
                      ? String(formState.nutritionalData.fiber?.quantity)
                      : ""
                  }
                  onChangeText={(text) => {
                    handleNutritionalDataChange("fiber", text, setFormState);
                    field.onChange(text);
                  }}
                />
              )}
              name="fiber"
            />
          </View>
        </View>
        {errors.fiber && (
          <Text style={styles.errorText}>{String(errors.fiber.message)}</Text>
        )}
      </View>

      {/* GLUTEN FREE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Gluten Free?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="isGlutenFree"
                field={field}
                setFormState={setFormState}
              />
            )}
            name="isGlutenFree"
          />
        </View>
      </View>

      {/* DAIRY FREE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Dairy Free?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="isDairyFree"
                field={field}
                setFormState={setFormState}
              />
            )}
            name="isDairyFree"
          />
        </View>
      </View>

      {/* VEGETARIAN */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Vegetarian?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="isVegetarian"
                field={field}
                setFormState={setFormState}
                trigger={trigger}
              />
            )}
            name="isVegetarian"
          />
        </View>
      </View>

      {/* VEGAN */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={styles.formLabel}>Vegan?</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Controller
              control={control}
              render={({ field }) => (
                <FormSwitch
                  name="isVegan"
                  field={field}
                  setFormState={setFormState}
                  trigger={trigger}
                />
              )}
              name="isVegan"
              rules={{
                validate: {
                  vegetarianSelected: (value) => {
                    const isVegetarian = getValues("isVegetarian");
                    if (value && !isVegetarian) {
                      return "Please select vegetarian when vegan is selected";
                    }
                  },
                },
              }}
            />
          </View>
        </View>
        {errors.isVegan && (
          <Text style={styles.errorText}>{String(errors.isVegan.message)}</Text>
        )}
      </View>

      {/* FRESH FRUIT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Fresh Fruit?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="hasFreshFruit"
                field={field}
                setFormState={setFormState}
              />
            )}
            name="hasFreshFruit"
          />
        </View>
      </View>

      {/* FRESH VEGETABLES */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.formLabel}>Fresh Vegetables?</Text>
        </View>
        <View style={{ width: "20%" }}>
          <Controller
            control={control}
            render={({ field }) => (
              <FormSwitch
                name="hasFreshVegetables"
                field={field}
                setFormState={setFormState}
              />
            )}
            name="hasFreshVegetables"
          />
        </View>
      </View>

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
    </ScrollView>
  );
}
