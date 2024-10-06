import { createContext, useEffect, useReducer } from "@wordpress/element";
import { CustomField, CustomFieldEntityType } from "../types/custom-field";
import { reducer } from "../reducers/custom-fields-reducer";
import { toast } from "react-toastify";
import { getCustomFieldsRequest } from "../api/api";
import {
  ADD_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_LOADING,
  SET_CUSTOM_FIELDS,
} from "../constants";

const initialState: State = {
  customFields: [],
  loading: true,
};

type State = {
  customFields: CustomField[];
  loading: boolean;
};

type Action =
  | { type: typeof SET_CUSTOM_FIELD_LOADING; payload: boolean }
  | { type: typeof ADD_CUSTOM_FIELD; payload: CustomField }
  | { type: typeof SET_CUSTOM_FIELDS; payload: CustomField[] };

type Dispatch = (action: Action) => void;

type CustomFieldsContextType = {
  state: State;
  customFieldsDispatch: Dispatch;
  fetchCustomFields: () => void;
};

const CustomFieldsContext = createContext<CustomFieldsContextType>({
  state: initialState,
  customFieldsDispatch: () => {},
  fetchCustomFields: () => {},
});

const CustomFieldsContextProvider = ({
  children,
  entityId,
  entityType,
}: {
  children: React.ReactNode;
  entityId: string;
  entityType: CustomFieldEntityType;
}) => {
  const [state, customFieldsDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const fetchCustomFields = async () => {
    try {
      customFieldsDispatch({ type: SET_CUSTOM_FIELD_LOADING, payload: true });
      const response = await getCustomFieldsRequest(entityId, entityType);
      customFieldsDispatch({ type: SET_CUSTOM_FIELDS, payload: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch custom fields");
    } finally {
      customFieldsDispatch({ type: SET_CUSTOM_FIELD_LOADING, payload: false });
    }
  };

  return (
    <CustomFieldsContext.Provider
      value={{ state, customFieldsDispatch, fetchCustomFields }}
    >
      {children}
    </CustomFieldsContext.Provider>
  );
};

export {
  CustomFieldsContextProvider,
  CustomFieldsContext,
  type State,
  type Action,
};
