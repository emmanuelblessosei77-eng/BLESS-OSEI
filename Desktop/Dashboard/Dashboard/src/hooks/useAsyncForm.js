import { useState, useCallback } from 'react'

export function useAsyncForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const clearMessages = useCallback(() => {
    setSuccessMessage('')
    setErrorMessage('')
  }, [])

  const setSuccess = useCallback((message) => {
    setSuccessMessage(message)
    setErrorMessage('')
  }, [])

  const setError = useCallback((message) => {
    setErrorMessage(message)
    setSuccessMessage('')
  }, [])

  const executeAsync = useCallback(
    async (asyncFn, onSuccess, onError) => {
      setIsLoading(true)
      clearMessages()
      try {
        const result = await asyncFn()
        if (result.success) {
          setSuccess(result.message || 'Success!')
          onSuccess?.(result)
        } else {
          setError(result.message || 'An error occurred')
          onError?.(result)
        }
        return result
      } catch (error) {
        const errorMsg = error.message || 'An unexpected error occurred'
        setError(errorMsg)
        onError?.(error)
        return { success: false, message: errorMsg }
      } finally {
        setIsLoading(false)
      }
    },
    [clearMessages, setSuccess, setError],
  )

  return {
    isLoading,
    successMessage,
    errorMessage,
    clearMessages,
    setSuccess,
    setError,
    executeAsync,
  }
}

export default useAsyncForm
