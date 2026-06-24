import type { Config } from "@react-router/dev/config";

export default {
  basename: process.env.NODE_ENV === 'production' ? '/idehnoproject/' : '/',
  ssr: false,
} satisfies Config;