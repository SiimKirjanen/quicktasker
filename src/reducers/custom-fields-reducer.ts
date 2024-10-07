import {
  ADD_CUSTOM_FIELD,
  DELETE_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_LOADING,
  SET_CUSTOM_FIELDS,
  SET_CUSTOM_FIELDS_LOCATION,
} from "../constants";
import { Action, State } from "../providers/CustomFieldsContextProvider";
import { CustomField, CustomFieldEntityType } from "../types/custom-field";

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
    case SET_CUSTOM_FIELDS_LOCATION: {
      const locationOfCustomFields: CustomFieldEntityType = action.payload;

      return {
        ...state,
        locationOfCustomFields,
      };
    }
    case DELETE_CUSTOM_FIELD: {
      const customFieldId: string = action.payload;
      const customFields = state.customFields.filter(
        (customField) => customField.id !== customFieldId,
      );

      return {
        ...state,
        customFields,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
