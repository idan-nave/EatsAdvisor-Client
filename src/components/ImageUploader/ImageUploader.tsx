import { useAuth } from '@context'
import { useNavigate } from 'react-router'
import { ROUTES } from '@constants'
import './image-uploader.css'

export default function ImageUploader() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      return
    }

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      navigate(ROUTES.MENU_SCAN, { state: { file, allowed: true } })
    }
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (!user) {
      event.preventDefault()
      navigate(ROUTES.LOGIN)
    }
  }

  return (
    <div className="image-uploader-container">
      {user && (
        <div className="welcome-message">
          <div className='welcome-message-inner'>Welcome, {user.firstName || 'User'}!</div>
          <p>Ready to discover personalized menu recommendations?</p>
        </div>
      )}
      
      <div className='upload-message-container'>
        <div>Upload a menu image to receive personalized</div>
        <span className="green-ai-text">AI-powered</span> recommendations
      </div>

      <label className="upload-button" onClick={handleButtonClick}>
      <span>Upload a Menu</span>
        <input
          className="upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          disabled={!user}
        />
      </label>
    </div>
  )
}
