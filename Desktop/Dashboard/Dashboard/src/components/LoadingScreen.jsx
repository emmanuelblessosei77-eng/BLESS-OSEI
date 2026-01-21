import Spinner from './Spinner.jsx'

function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="form-loading">
      <Spinner />
      <p>{message}</p>
    </div>
  )
}

export default LoadingScreen
