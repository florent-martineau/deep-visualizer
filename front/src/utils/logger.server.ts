import { env } from "@/env";
import { Logtail } from "@logtail/node";

export const serverLogger = new Logtail(env.BETTERSTACK_TOKEN, {
  endpoint: `https://${env.BETTERSTACK_INGESTING_HOST}`,
});
