import React, { useState, useEffect } from "react";
import { Switch } from "react-native-paper";
import { Food } from "../constants/types/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { handleNutritionalDataChange } from "../custom/functions/forms/handleFormChanges";
import { colors, getStyles } from "../constants/styles/global";

export default function FormSwitch({
  startSwitchAsOn,
  name,
  field,
  setFormState,
  trigger,
}: {
  startSwitchAsOn: boolean;
  name: keyof Food["nutritionalData"];
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
  setFormState: React.Dispatch<React.SetStateAction<Food>>;
  trigger?: (name?: string | string[]) => Promise<boolean>;
}) {
  const [switchIsOn, setSwitchIsOn] = useState(startSwitchAsOn);
  const { theme } = getStyles();

  useEffect(() => {
    setSwitchIsOn(startSwitchAsOn);
  }, [startSwitchAsOn]);

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
