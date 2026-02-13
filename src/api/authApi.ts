import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import {
  userSchema,
  type ConfirmToken,
  type ForgotPasswordForm,
  type NewPasswordForm,
  type RequestConfirmationCodeForm,
  type UserLoginForm,
  type UserRegisterForm,
} from '../types'

export const createAccount = async (formData: UserRegisterForm) => {
  try {
    const url = '/auth/create-account'
    const { data } = await api.post<string>(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const confirmAccount = async (token: ConfirmToken) => {
  try {
    const url = '/auth/confirm-account'
    const { data } = await api.post<string>(url, token)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const requestConfirmationCode = async (
  formData: RequestConfirmationCodeForm,
) => {
  try {
    const url = '/auth/request-code'
    const { data } = await api.post<string>(url, formData)
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const authenticateUser = async (formData: UserLoginForm) => {
  try {
    const url = '/auth/login'
    
    // Get the JWT and save it
    const { data } = await api.post<string>(url, formData)
    localStorage.setItem('AUTH_TOKEN', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error)
  }
}

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const url = '/auth/forgot-password'
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error)
  }
}

export const validateToken = async (token: ConfirmToken) => {
  try {
    const url = '/auth/validate-token'
    const { data } = await api.post<string>(url, token)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error)
  }
}

export const resetPassword = async ({formData, token}: { formData: NewPasswordForm, token: ConfirmToken['token']}) => {
  try {
    const url = `/auth/reset-password/${token}`
    console.log(formData)
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.data.errors) throw new Error(error.response.data.errors[0].msg) 
      throw new Error(error.response.data.error)
    }
  }
}

export const getUser = async () => {
  try {
    const url = '/auth/user'
    const { data } = await api(url)
    
    const response = userSchema.safeParse(data)
    if(response.success) return response.data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    }
  }
}
