export interface ResponseData<T = unknown> {
  message: string
  data?: T
  success: boolean
  error: boolean
}