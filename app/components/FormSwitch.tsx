import React, { useState } from "react";
import { Switch } from "react-native-paper";
import { FoodForm } from "../constants/types/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { handleNutritionalDataChange } from "../functions/forms/formValidation";
import { colors, getStyles } from "../constants/styles/global";

export default function FormSwitch({
  name,
  field,
  setFormState,
  trigger,
}: {
  name: keyof FoodForm["nutritionalData"];
  field: ControllerRenderProps<
    FieldValues,
    | "isEstimate"
    | "isGlutenFree"
    | "isDairyFree"
    | "isVegetarian"
    | "isVegan"
    | "hasFreshFruits"
    | "hasFreshVegetables"
  >;
  setFormState: React.Dispatch<React.SetStateAction<FoodForm>>;
  trigger?: (name?: string | string[]) => Promise<boolean>;
}) {
  const [switchIsOn, setSwitchIsOn] = useState(false);
  const { theme, styles } = getStyles();

  function handleChange(value: boolean) {
    // for the switch component
    setSwitchIsOn(!switchIsOn);
    // for the controller
    field.onChange(value);
    // for the form state
    handleNutritionalDataChange(name, value, setFormState);
    // for form error handling
    if (trigger) {
      trigger("isVegan");
    }
  }
  return (
    <Switch
      value={switchIsOn}
      onValueChange={handleChange}
      color={colors[theme].switch.on}
    />
  );
}
