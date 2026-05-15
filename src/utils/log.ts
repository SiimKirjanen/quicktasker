import { __ } from "@wordpress/i18n";
import { WPQTLogCreatedBy } from "../types/enums";

const logCreatedByString: { [key in WPQTLogCreatedBy]: string } = {
  [WPQTLogCreatedBy.Admin]: __("Admin", "quicktasker"),
  [WPQTLogCreatedBy.Automation]: __("Automation", "quicktasker"),
  [WPQTLogCreatedBy.System]: __("System", "quicktasker"),
  [WPQTLogCreatedBy.WPQTUser]: "Quicktasker",
  [WPQTLogCreatedBy.Import]: __("Import", "quicktasker"),
  [WPQTLogCreatedBy.Webhook]: __("Webhook", "quicktasker"),
  [WPQTLogCreatedBy.Anonymous]: __("Anonymous", "quicktasker"),
  [WPQTLogCreatedBy.WpUser]: __("WP user", "quicktasker"),
};

export { logCreatedByString };
