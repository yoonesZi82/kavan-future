import { tableFeatures } from "@tanstack/react-table"

/** Core table features only — add sorting/filtering modules when needed. */
export const usersTableFeatures = tableFeatures({})

export type UsersTableFeatures = typeof usersTableFeatures
