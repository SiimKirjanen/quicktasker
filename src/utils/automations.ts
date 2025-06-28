import { __ } from "@wordpress/i18n";
import {
  AllAutomationTriggers,
  Automation,
  AutomationAction,
  AutomationActionType,
  AutomationFromServer,
  AutomationTrigger,
  SeatRegAutomationTrigger,
  TargetType,
  WoocommerceOrderAutomationTrigger,
} from "../types/automation";

const automationActionStrings: { [key in AutomationAction]: string } = {
  [AutomationAction.ARCHIVE_TASK]: __("Archive task", "quicktasker"),
  [AutomationAction.ASSIGN_USER]: __("Assign user", "quickkasker"),
  [AutomationAction.NEW_ENTITY_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.DELETED_ENTITY_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_ASSIGNED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_UNASSIGNED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_PUBLIC_COMMENT_ADDED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_PRIVATE_COMMENT_ADDED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_FILE_UPLOADED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_FILE_DELETED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.CREATE_TASK]: __("Create task", "quicktasker"),
  [AutomationAction.SEND_SLACK_MESSAGE]: __(
    "Send Slack message",
    "quicktasker",
  ),
};

const automationTargetStrings: { [key in TargetType]: string } = {
  [TargetType.Task]: __("Task", "quicktasker"),
  [TargetType.Stage]: __("Stage", "quicktasker"),
  [TargetType.PIPELINE]: __("Board", "quicktasker"),
  [TargetType.quicktasker]: "Quicktasker",
  [TargetType.WOOCOMMERCE_ORDER]: __("WooCommerce Order", "quicktasker"),
  [TargetType.SEATREG_BOOKING]: __("SeatReg Booking", "quicktasker"),
};

const automationTriggerStrings: { [key in AllAutomationTriggers]: string } = {
  [AutomationTrigger.TASK_DONE]: __("Task marked as done", "quicktasker"),
  [AutomationTrigger.Task_NOT_DONE]: __(
    "Task marked as not done",
    "quicktasker",
  ),
  [AutomationTrigger.TASK_CREATED]: __("Task created", "quicktasker"),
  [AutomationTrigger.TASK_DELETED]: __("Task deleted", "quicktasker"),
  [AutomationTrigger.TASK_ASSIGNED]: __("Task assigned", "quicktasker"),
  [AutomationTrigger.TASK_UNASSIGNED]: __("Task unassigned", "quicktasker"),
  [AutomationTrigger.TASK_PUBLIC_COMMENT_ADDED]: __(
    "Public comment added",
    "quicktasker",
  ),
  [AutomationTrigger.TASK_PRIVATE_COMMENT_ADDED]: __(
    "Private comment added",
    "quicktasker",
  ),
  [AutomationTrigger.TASK_FILE_UPLOADED]: __("File attached", "quicktasker"),
  [AutomationTrigger.TASK_FILE_DELETED]: __(
    "Attached file deleted",
    "quicktasker",
  ),
  [WoocommerceOrderAutomationTrigger.WOOCOMMERCE_ORDER_ADDED]: __(
    "Order added",
    "quicktasker",
  ),
  [SeatRegAutomationTrigger.SEATREG_BOOKING_CREATED]: __(
    "Booking created",
    "quicktasker",
  ),
  [SeatRegAutomationTrigger.SEATREG_BOOKING_APPROVED]: __(
    "Booking gets approved state",
    "quicktasker",
  ),
  [SeatRegAutomationTrigger.SEATREG_BOOKING_PENDING]: __(
    "Booking gets pending state",
    "quicktasker",
  ),
};

const woocommerceOrderAutomationTriggerStrings: {
  [key in WoocommerceOrderAutomationTrigger]: string;
} = {
  [WoocommerceOrderAutomationTrigger.WOOCOMMERCE_ORDER_ADDED]: __(
    "Order added",
    "quicktasker",
  ),
};

const taskAutomations: { [key in AutomationTrigger]: AutomationActionType[] } =
  {
    [AutomationTrigger.TASK_DONE]: [
      {
        id: AutomationAction.ARCHIVE_TASK,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.Task_NOT_DONE]: [
      {
        id: AutomationAction.ARCHIVE_TASK,
      },
    ],
    [AutomationTrigger.TASK_CREATED]: [
      {
        id: AutomationAction.ASSIGN_USER,
        requireAutomationTarget: true,
        requireAutomationTargetType: true,
      },
      {
        id: AutomationAction.NEW_ENTITY_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_DELETED]: [
      {
        id: AutomationAction.DELETED_ENTITY_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_ASSIGNED]: [
      {
        id: AutomationAction.TASK_ASSIGNED_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_UNASSIGNED]: [
      {
        id: AutomationAction.TASK_UNASSIGNED_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_PUBLIC_COMMENT_ADDED]: [
      {
        id: AutomationAction.TASK_PUBLIC_COMMENT_ADDED_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_PRIVATE_COMMENT_ADDED]: [
      {
        id: AutomationAction.TASK_PRIVATE_COMMENT_ADDED_EMAIL,
        requireMetaData: true,
      },
      {
        id: AutomationAction.SEND_SLACK_MESSAGE,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_FILE_UPLOADED]: [
      {
        id: AutomationAction.TASK_FILE_UPLOADED_EMAIL,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_FILE_DELETED]: [
      {
        id: AutomationAction.TASK_FILE_DELETED_EMAIL,
        requireMetaData: true,
      },
    ],
  };

const woocommerceOrderAutomations: {
  [key in WoocommerceOrderAutomationTrigger]: AutomationActionType[];
} = {
  [WoocommerceOrderAutomationTrigger.WOOCOMMERCE_ORDER_ADDED]: [
    {
      id: AutomationAction.CREATE_TASK,
    },
  ],
};

const seatregBookingAutomations: {
  [key in SeatRegAutomationTrigger]: AutomationActionType[];
} = {
  [SeatRegAutomationTrigger.SEATREG_BOOKING_CREATED]: [
    {
      id: AutomationAction.CREATE_TASK,
    },
  ],
  [SeatRegAutomationTrigger.SEATREG_BOOKING_APPROVED]: [
    {
      id: AutomationAction.CREATE_TASK,
    },
  ],
  [SeatRegAutomationTrigger.SEATREG_BOOKING_PENDING]: [
    {
      id: AutomationAction.CREATE_TASK,
    },
  ],
};

const availableAutomations = {
  [TargetType.Task]: taskAutomations,
  [TargetType.WOOCOMMERCE_ORDER]: woocommerceOrderAutomations,
  [TargetType.SEATREG_BOOKING]: seatregBookingAutomations,
};

const convertAutomationsFromServer = (
  automations: AutomationFromServer[],
): Automation[] => {
  return automations.map((automation) => ({
    ...automation,
    active: automation.active === "1",
    verify_success: automation.verify_success === "1",
  }));
};

export {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
  availableAutomations,
  convertAutomationsFromServer,
  woocommerceOrderAutomationTriggerStrings,
};
