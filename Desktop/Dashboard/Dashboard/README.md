

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Reusable Components & Hooks Documentation

## Components Created

### Form Components
1. **FormContainer** - Wrapper for form elements with built-in styling
   - Props: `children`, `onSubmit`, `disabled`
   - Usage: Wrap form fields with consistent styling

2. **FormFields** - Renders multiple input fields from a configuration array
   - Props: `fields`, `formData`, `errors`, `loading`, `onChange`
   - Usage: Reduces code duplication for rendering form inputs

3. **FormMessage** - Display error or success messages
   - Props: `type` ('error' | 'success'), `message`
   - Usage: Show inline error/success feedback

4. **FormSubmitButton** - Intelligent submit button with loading state
   - Props: `isLoading`, `isValid`, `loadingText`, `submitText`
   - Usage: Automatically enables/disables based on form validity

5. **CheckboxField** - Styled checkbox input component
   - Props: `label`, `name`, `checked`, `onChange`, `disabled`
   - Usage: Consistent checkbox styling (e.g., "Remember me")

6. **LoadingScreen** - Full-page loading state display
   - Props: `message`
   - Usage: Show during async operations

7. **SuccessScreen** - Full-page success message display
   - Props: `title`, `message`
   - Usage: Celebrate successful form submissions

8. **FormHeader** - Reusable form header
   - Props: `title`, `subtitle`
   - Usage: Consistent form title styling

9. **FormFooter** - Footer container for form actions
   - Props: `children`
   - Usage: Wrap form footer content

10. **FormCard** - Card wrapper for forms
    - Props: `children`
    - Usage: Consistent form card styling

### Existing Components (Enhanced)
- **Input** - Enhanced with `disabled` state support
- **Button** - Already supports variants and disabled states
- **Card** - Main container component
- **Spinner** - Loading spinner animation

## Custom Hooks

### 1. useFormValidation
Real-time form validation hook with automatic validation on change
```javascript
const { form, errors, isValid, handleChange, setFormValues, resetForm } = useFormValidation(
  initialState,
  validators
)
```
- Features:
  - Real-time validation
  - Error tracking
  - Form state management
  - Automatic validation triggers
  - Reset functionality

### 2. useAsyncForm
Handles async form operations (loading, success, error states)
```javascript
const { isLoading, successMessage, errorMessage, executeAsync } = useAsyncForm()
```
- Features:
  - Loading state management
  - Success/error message handling
  - Automatic cleanup
  - Easy async function execution

## Utility Functions

### Validators (utils/validators.js)
- `validateEmail(email)` - Email format validation
- `validatePassword(password, minLength)` - Password strength
- `validateName(name)` - Name validation
- `validateConfirmPassword(password, confirmPassword)` - Password matching
- `validateRequired(value, fieldName)` - Generic required field
- `validateMinLength(value, minLength, fieldName)` - Minimum length
- `validateMaxLength(value, maxLength, fieldName)` - Maximum length
- `validatePattern(value, pattern, message)` - Regex pattern matching

## Usage Examples

### Form with Validation
```javascript
import { 
  FormContainer, 
  FormFields, 
  FormSubmitButton,
  FormMessage 
} from '../components/index.js'
import { useFormValidation, useAsyncForm } from '../hooks/index.js'
import { validateEmail, validatePassword } from '../utils/validators.js'

function MyForm() {
  const { form, errors, isValid, handleChange } = useFormValidation(
    { email: '', password: '' },
    {
      email: (v) => validateEmail(v),
      password: (v) => validatePassword(v)
    }
  )

  const { isLoading, successMessage, errorMessage, executeAsync } = useAsyncForm()

  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
  ]

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormFields fields={fields} formData={form} errors={errors} onChange={handleChange} />
      <FormMessage type="error" message={errorMessage} />
      <FormSubmitButton isLoading={isLoading} isValid={isValid} submitText="Submit" />
    </FormContainer>
  )
}
```

### Custom Validator
```javascript
const customValidators = {
  username: (value) => {
    if (!value) return 'Username is required'
    if (value.length < 3) return 'Username must be at least 3 characters'
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores'
    return null
  }
}
```

## Benefits
✅ **DRY Code** - Eliminates duplicate form logic
✅ **Consistency** - Unified form styling and behavior
✅ **Reusability** - Drop components into any new form
✅ **Maintainability** - Update all forms by changing one component
✅ **Type Safety** - Clear prop interfaces
✅ **Performance** - Optimized with useCallback hooks
✅ **Accessibility** - Built-in ARIA labels and error handling
