import React, { useState } from "react";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { View } from "react-native";
import { getStyles } from "../constants/styles/global";
import { FoodForm } from "../constants/types/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { handleTopLevelStringChange } from "../functions/forms/formValidation";

/**
 * @brief This component is purpose built for the EnterFoodForm.tsx component.
 * @param name The name of the field in the form state
 * @param options The options for the dropdown. label = will be displayed. value = stored to DB
 * @param field Used by the react form controller
 * @param setFormState Used to update the form state
 */
export default function Dropdown({
  name,
  options,
  formState,
  field,
  setFormState,
}: {
  name: string;
  options: { label: string; value: string }[];
  formState: FoodForm;
  field: ControllerRenderProps<FieldValues, "restaurantUid" | "menuUid">;
  setFormState: React.Dispatch<React.SetStateAction<FoodForm>>;
}) {
  const { styles } = getStyles();

  const placeholder = {
    label: "Select an option...",
    value: "",
  };
  const [selectedValue, setSelectedValue] = useState<string>(placeholder.value);

  function handleChange(value: string) {
    // for the dropdown component
    setSelectedValue(value);
    // for the controller
    field.onChange(value);
    // for the form state
    handleTopLevelStringChange(name, value, setFormState);
  }

  return (
    <View>
      <RNPickerSelect
        placeholder={placeholder}
        items={options as Item[]}
        onValueChange={handleChange}
        value={selectedValue}
        style={{
          inputIOS: styles.dropdown,
          inputAndroid: styles.dropdown,
          inputWeb: styles.dropdown,
        }}
      />
    </View>
  );
}
