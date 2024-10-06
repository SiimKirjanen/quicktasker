import {
  ADD_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_LOADING,
  SET_CUSTOM_FIELDS,
} from "../constants";
import { Action, State } from "../providers/CustomFieldsContextProvider";
import { CustomField } from "../types/custom-field";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_CUSTOM_FIELD_LOADING: {
      const loading: boolean = action.payload;

      return {
        ...state,
        loading,
      };
    }
    case SET_CUSTOM_FIELDS: {
      const customFields: CustomField[] = action.payload;

      return {
        ...state,
        customFields,
      };
    }
    case ADD_CUSTOM_FIELD: {
      const customField: CustomField = action.payload;

      return {
        ...state,
        customFields: [...state.customFields, customField],
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
