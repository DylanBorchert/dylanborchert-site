import { GlobalConfig } from "payload";

const StravaTokens: GlobalConfig = {
  slug: "strava-tokens",
  label: "Strava Tokens",
  admin: {
    hidden: true,
  },
  access: {
    read: () => false,
    update: () => false,
  },
  fields: [
    {
      name: "accessToken",
      type: "text",
      required: false,
    },
    {
      name: "refreshToken",
      type: "text",
      required: false,
    },
    {
      name: "expiresAt",
      type: "number",
      required: false,
      defaultValue: 0,
    },
  ],
};

export default StravaTokens;
