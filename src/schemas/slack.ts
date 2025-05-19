import { z } from "zod";

const slackMessageWebhookSchema = z
  .string()
  .url({ message: "Invalid URL" })
  .refine((url) => url.startsWith("https://hooks.slack.com/services/"), {
    message: "Invalid Slack webhook URL",
  });

export { slackMessageWebhookSchema };
