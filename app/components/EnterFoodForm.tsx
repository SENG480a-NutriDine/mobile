import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { colors, getStyles } from "../constants/styles/global";
import { Food } from "../constants/types/types";
import { initializeFoodForm } from "../constants/objects/initializeFoodForm";
import {
  handleNutritionalDataChange,
  handlePurchaseAtChange,
  handleTopLevelStringChange,
} from "../custom/functions/forms/handleFormChanges";
import FormDropdown from "./FormDropdown";
import FormSwitch from "./FormSwitch";
import useRestaurants from "../custom/hooks/useRestaurants";
import useMenu from "../custom/hooks/useMenu";
import { generateUid } from "../custom/functions/db/db";
import {
  safeToSendNewFoodToDB,
  sendNewFoodToDB,
} from "../custom/functions/forms/formSubmission";
import _ from "lodash";

export default function EnterFoodForm() {
  const { theme, styles } = getStyles();
  const [formState, setFormState] = useState<Food>(
    _.cloneDeep(initializeFoodForm)
  );
  const { restaurants, restaurantsAreLoading } = useRestaurants();
  const { menus, menusAreLoading } = useMenu(formState.restaurantUid);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    reset,
  } = useForm();
  const [formSubmissionError, setFormSubmissionError] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [regenerateUid, setRegenerateUid] = useState(0);

  useEffect(() => {
    async function assignUid() {
      console.log("Creating UID in EnterFoodForm.tsx...");
      const foodUid = await generateUid();
      handleTopLevelStringChange("uid", foodUid, setFormState);

      //TODO: Get the current userUid from auth
      // set formState.submittedByUserUid to this value
    }
    assignUid();
  }, [regenerateUid]);

  async function onSubmit() {
    const isSafeToSubmit = safeToSendNewFoodToDB(formState);

    if (isSafeToSubmit.isSafe) {
      const dbWriteSuccess: { success: boolean; error: string } =
        await sendNewFoodToDB(formState);
      if (dbWriteSuccess.success) {
        setModalVisible(true);
      }
    } else {
      setFormSubmissionError(isSafeToSubmit.reason);
    }
  }

  const restaurantOptions = restaurantsAreLoading
    ? [{ label: "loading..", value: "" }]
    : restaurants.map((restaurant) => {
        return { label: restaurant.name, value: restaurant.uid };
      });

  const menuOptions = menusAreLoading
    ? [{ label: "loading..", value: "" }]
    : formState.restaurantUid === ""
    ? [{ label: "Please select a restaurant to see menus", value: "" }]
    : menus.map((menu) => {
        return { label: menu.name, value: menu.uid };
      });

  // Prepare form for next new food entry
  function closeModalAndClearForm() {
    setModalVisible(!modalVisible);
    setFormState(_.cloneDeep(initializeFoodForm));
    setFormSubmissionError("");
    setRegenerateUid(regenerateUid + 1);
    reset(initializeFoodForm);
  }

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
                startSwitchAsOn={formState.nutritionalData.isEstimate}
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
                startSwitchAsOn={formState.nutritionalData.isGlutenFree}
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
                startSwitchAsOn={formState.nutritionalData.isDairyFree}
                name="isDairyFree"
                field={field}
                setFormState={setFormState}
                trigger={trigger}
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
                startSwitchAsOn={formState.nutritionalData.isVegetarian}
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
                  startSwitchAsOn={formState.nutritionalData.isVegan}
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
                  dairyFreeSelected: (value) => {
                    const isDairyFree = getValues("isDairyFree");
                    if (value && !isDairyFree) {
                      return "Please select dairy free when vegan is selected";
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
                startSwitchAsOn={formState.nutritionalData.hasFreshFruit}
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
                startSwitchAsOn={formState.nutritionalData.hasFreshVegetables}
                name="hasFreshVegetables"
                field={field}
                setFormState={setFormState}
                trigger={trigger}
              />
            )}
            name="hasFreshVegetables"
          />
        </View>
      </View>

      {/* SUBMIT */}
      {formSubmissionError !== "" && (
        <Text style={{ paddingTop: 16, ...styles.errorText }}>
          {formSubmissionError}
        </Text>
      )}

      {/* PURCHASE AT */}
      <Text style={{ marginTop: 10, ...styles.formLabel }}>Purchase At</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={colors[theme].placeholderText}
              placeholder="Restaurant Name"
              value={formState.purchaseAt?.[0]?.displayName ?? ""}
              onChangeText={(text) => {
                handlePurchaseAtChange(null, text, setFormState);
                field.onChange(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={colors[theme].placeholderText}
              placeholder="www.restaurant/order-online.com"
              value={formState.purchaseAt?.[0]?.url ?? ""}
              onChangeText={(text) => {
                handlePurchaseAtChange(text, null, setFormState);
                field.onChange(text);
              }}
            />
          </View>
        )}
        name="purchaseAt"
        // rules={{
        //   required: "Please enter a food name",
        //   minLength: {
        //     value: 1,
        //     message: "Please enter a food name,",
        //   },
        // }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{String(errors.name.message)}</Text>
      )}

      <Button
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        style={{ marginTop: 10, marginBottom: 10, ...styles.buttonShape }}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>

      {/* SUBMISSION MODAL */}
      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <Pressable onPress={closeModalAndClearForm} style={styles.modal}>
            <Text
              style={{ ...styles.text, fontSize: 24 }}
            >{`"${formState.name}" successfully added!`}</Text>
            <Text style={{ ...styles.text }}>(Tap to dismiss)</Text>
          </Pressable>
        </Modal>
      )}
    </ScrollView>
  );
}
