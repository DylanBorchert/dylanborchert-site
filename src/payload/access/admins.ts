import type { AccessArgs } from "payload/config";

import { checkRole } from "#/payload/collections/Users/checkRole";
import type { User } from "#payload/payload";

type isAdmin = (args: AccessArgs<unknown, User>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(["admin"], user);
};
