import { env } from "@/env";
import { Browser as LogtailBrowser, Node as LogtailServer } from "@logtail/js";
import { isServer } from "@tanstack/react-query";

export const logger = isServer
  ? new LogtailServer(env.BETTERSTACK_TOKEN, {
      endpoint: `https://${env.BETTERSTACK_INGESTING_HOST}`,
    })
  : new LogtailBrowser(env.VITE_BETTERSTACK_TOKEN, {
      endpoint: `https://${env.VITE_BETTERSTACK_INGESTING_HOST}`,
    });
