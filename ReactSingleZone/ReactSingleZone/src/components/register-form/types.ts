export interface RegisterFormData {
  UserName: string
  email: string
  password: string
  roleName: string
}

export interface AuthState {
  isLoading: boolean
  error: string | null
}
