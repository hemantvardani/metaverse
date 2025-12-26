import { Prisma } from "@prisma/client";

export const PublicFieldsUserSelect = {
  uuid: true,
  userName: true,
  role: true,
  avatarId: true,
  avatar: {
    select: {
      uuid: true,
      title: true,
      image: true,
    },
  },
} as const;

export type PublicFieldsUserFromDB = Prisma.UserGetPayload<{
  select: typeof PublicFieldsUserSelect;
}>;
