import { useLocation, useNavigate } from 'react-router-dom'
import {
  CheckboxField,
  Footer,
  FormContainer,
  FormFields,
  FormMessage,
  FormSubmitButton,
  LoadingScreen,
  SuccessScreen,
  Card,
} from '../components/index.js'
import { useFormValidation, useAsyncForm, useAuth } from '../hooks/index.js'
import { validateEmail, validateRequired } from '../utils/validators.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
]

const LOGIN_VALIDATORS = {
  email: (value) => validateEmail(value),
  password: (value) => validateRequired(value, 'Password'),
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { isLoading, successMessage, errorMessage, executeAsync } = useAsyncForm()
  const [rememberMe, setRememberMe] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const { form, errors, isValid, handleChange } = useFormValidation(
    {
      email: localStorage.getItem('rememberEmail') || '',
      password: '',
    },
    LOGIN_VALIDATORS,
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    await executeAsync(
      () => login(form),
      () => {
        if (rememberMe) {
          localStorage.setItem('rememberEmail', form.email)
        } else {
          localStorage.removeItem('rememberEmail')
        }
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/dashboard'
          navigate(from, { replace: true })
        }, 1500)
      },
      () => {},
    )
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!resetEmail) {
      setResetMessage('Please enter your email address')
      return
    }
    if (!resetEmail.includes('@')) {
      setResetMessage('Please enter a valid email')
      return
    }
    setResetMessage('Password reset link sent to ' + resetEmail + '. Check your email.')
    setTimeout(() => {
      setShowForgotPassword(false)
      setResetEmail('')
      setResetMessage('')
    }, 3000)
  }

  if (showForgotPassword) {
    return (
      <div className="page">
        <Card
          title="Reset Password"
          actions={
            <button
              onClick={() => {
                setShowForgotPassword(false)
                setResetMessage('')
              }}
              className="link-button"
            >
              Back to Login
            </button>
          }
        >
          <form className="stack" onSubmit={handleForgotPassword}>
            <p className="form-subtitle">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="field-input"
              disabled={resetMessage.includes('sent')}
            />
            <FormMessage type={resetMessage.includes('sent') ? 'success' : 'error'} message={resetMessage} />
            {!resetMessage.includes('sent') && (
              <button type="submit" className="btn btn-primary">
                Send Reset Link
              </button>
            )}
          </form>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="page">
        <Card>
          <LoadingScreen message="Logging you in..." />
        </Card>
      </div>
    )
  }

  if (successMessage) {
    return (
      <div className="page">
        <Card>
          <SuccessScreen title="Welcome back!" message={successMessage} />
        </Card>
      </div>
    )
  }

  return (
    <div className="page">
      <Card
        title="Welcome back"
        actions={
          <Link className="link" to="/signup">
            Need an account? Sign up
          </Link>
        }
      >
        <FormContainer onSubmit={handleSubmit} disabled={isLoading}>
          <FormFields
            fields={LOGIN_FIELDS}
            formData={form}
            errors={errors}
            loading={isLoading}
            onChange={handleChange}
          />
          <CheckboxField
            label="Remember me"
            name="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <FormMessage type="error" message={errorMessage} />
          <FormSubmitButton
            isLoading={isLoading}
            isValid={isValid}
            loadingText="Logging in..."
            submitText="Login"
          />
          <button
            type="button"
            className="link-button"
            onClick={() => setShowForgotPassword(true)}
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </FormContainer>
      </Card>
      <Footer />
    </div>
  )
}

export default Login

