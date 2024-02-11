import { Item } from "react-native-picker-select";
import { FoodForm } from "../../constants/types/types";

// name, description, menuUid, restaurantUid, submittedByUserUid,
export const handleTopLevelStringChange = (
  name: string,
  value: string,
  formState: FoodForm,
  setFormState: React.Dispatch<React.SetStateAction<FoodForm>>
) => {
  setFormState({
    ...formState,
    [name]: value,
  });
};
