import type { User } from "../types/index"

export interface UserManagementProps {
  users: User[]
  isLoading: boolean
}