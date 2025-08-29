export interface User {
  _id: string
  name: string
  phone: string
  role: 'user' | 'agent' | 'admin'
  isAgentApproved?: boolean
  isActive?: boolean
  createdAt: string
}

export interface Wallet {
  _id: string
  user: string | User
  balance: number
  isBlocked: boolean
}

export interface Transaction {
  _id: string
  type: 'top-up' | 'withdraw' | 'send' | 'cash-in' | 'cash-out' | 'admin-adjustment'
  amount: number
  fee: number
  commission: number
  from: string | User
  to: string | User
  status: 'pending' | 'completed' | 'failed' | 'reversed'
  description?: string
  adminNote?: string
  referenceId?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface LoginRequest {
  phone: string
  password: string
}

export interface RegisterRequest {
  name: string
  phone: string
  password: string
  role: 'user' | 'agent'
}

export interface AddMoneyRequest {
  amount: number
}

export interface SendMoneyRequest {
  receiverId: string
  amount: number
}

export interface CashInOutRequest {
  userId: string
  amount: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface TransactionFilters {
  userId?: string
  type?: string
  status?: string
  startDate?: string
  endDate?: string
}