import { useNavigate } from 'react-router-dom'
import {
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
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators.js'
import { Link } from 'react-router-dom'

const SIGNUP_FIELDS = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
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
    placeholder: 'At least 6 characters',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
  },
]

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { isLoading, successMessage, errorMessage, executeAsync } = useAsyncForm()

  const { form, errors, isValid, handleChange, resetForm } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    {
      name: (value) => validateName(value),
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
      confirmPassword: (value, formData) => validateConfirmPassword(value, formData),
    },
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    await executeAsync(
      () =>
        signup({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      () => {
        setTimeout(() => navigate('/dashboard'), 2000)
      },
      () => {},
    )
  }

  if (isLoading) {
    return (
      <div className="page">
        <Card>
          <LoadingScreen message="Creating your account..." />
        </Card>
      </div>
    )
  }

  if (successMessage) {
    return (
      <div className="page">
        <Card>
          <SuccessScreen title="Welcome!" message={successMessage} />
        </Card>
      </div>
    )
  }

  return (
    <div className="page">
      <Card
        title="Create account"
        actions={
          <Link className="link" to="/login">
            Already have an account? Login
          </Link>
        }
      >
        <FormContainer onSubmit={handleSubmit} disabled={isLoading}>
          <FormFields
            fields={SIGNUP_FIELDS}
            formData={form}
            errors={errors}
            loading={isLoading}
            onChange={handleChange}
          />
          <FormMessage type="error" message={errorMessage} />
          <FormSubmitButton
            isLoading={isLoading}
            isValid={isValid}
            loadingText="Creating..."
            submitText="Sign up"
          />
        </FormContainer>
      </Card>
      <Footer />
    </div>
  )
}

export default Signup

