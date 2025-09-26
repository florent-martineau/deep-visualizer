import { env } from "@/env";
import { Logtail } from "@logtail/browser";

export const clientLogger = new Logtail(env.VITE_BETTERSTACK_TOKEN, {
  endpoint: `https://${env.VITE_BETTERSTACK_INGESTING_HOST}`,
});
