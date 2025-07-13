import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  addCustomFieldRequest,
  markCustomFieldAsDeletedRequest,
  restoreCustomFieldRequest,
  updateCustomFieldDefaultValueRequest,
  updateCustomFieldValueRequest,
} from "../../api/api";
import {
  CustomField,
  CustomFieldEntityType,
  CustomFieldType,
} from "../../types/custom-field";

function useCustomFieldActions() {
  const addCustomField = async (
    entityId: string,
    entityType: CustomFieldEntityType,
    type: CustomFieldType,
    name: string,
    description: string,
    callback?: (customField: CustomField) => void,
  ) => {
    try {
      const response = await addCustomFieldRequest(
        entityId,
        entityType,
        type,
        name,
        description,
      );
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to add a custom field", "quicktasker"));
    }
  };
  const markCustomFieldAsDeleted = async (
    customFieldId: string,
    callback?: () => void,
  ) => {
    try {
      await markCustomFieldAsDeletedRequest(customFieldId);
      if (callback) callback();
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to mark custom field as deleted", "quicktasker"));
    }
  };

  const restoreCustomField = async (
    customFieldId: string,
    callback: (restoredCustomField: CustomField) => void,
  ) => {
    try {
      const response = await restoreCustomFieldRequest(customFieldId);
      toast.success(__("Custom field restored", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to restore custom field", "quicktasker"));
    }
  };

  const updateCustomFieldValue = async (
    customFieldId: string,
    value: string,
    entityId: string,
    entityType: "quicktasker" | "task",
    callback?: () => void,
  ) => {
    try {
      await updateCustomFieldValueRequest(
        customFieldId,
        value,
        entityId,
        entityType,
      );
      toast.success(__("Custom field value updated", "quicktasker"));
      if (callback) callback();
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to update custom field value", "quicktasker"));
    }
  };

  const updateCustomFieldDefaultValue = async (
    customFieldId: string,
    value: string,
  ): Promise<{ success: boolean }> => {
    try {
      await updateCustomFieldDefaultValueRequest(customFieldId, value);
      toast.success(__("Custom field default value updated", "quicktasker"));

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      toast.error(
        __("Failed to update custom field default value", "quicktasker"),
      );
      return {
        success: false,
      };
    }
  };

  return {
    addCustomField,
    markCustomFieldAsDeleted,
    restoreCustomField,
    updateCustomFieldValue,
    updateCustomFieldDefaultValue,
  };
}

export { useCustomFieldActions };
