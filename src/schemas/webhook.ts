import { z } from "zod";

const webhookUrlSchema = z.string().url({ message: "Invalid URL" });

export { webhookUrlSchema };
