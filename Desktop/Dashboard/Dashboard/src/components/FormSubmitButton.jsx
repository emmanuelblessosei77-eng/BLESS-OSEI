import Button from './Button.jsx'
import Spinner from './Spinner.jsx'

function FormSubmitButton({ isLoading, isValid, loadingText, submitText }) {
  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!isValid || isLoading}
      className={!isValid ? 'btn-disabled' : ''}
    >
      {isLoading ? (
        <span className="button-content">
          <Spinner /> {loadingText}
        </span>
      ) : (
        submitText
      )}
    </Button>
  )
}

export default FormSubmitButton
