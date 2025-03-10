// import { useAuth, useUserProfileContext } from '@context'
// import { useNavigate } from 'react-router'
// import { ROUTES } from '@constants'
// import { RiseLoader } from 'react-spinners'
// import './image-uploader.css'

// export default function ImageUploader() {
//   const { user, loading: authLoading } = useAuth()
//   const { profile, loading: profileLoading } = useUserProfileContext()
//   const navigate = useNavigate()

//   // If either user or profile is still loading, display a loading indicator.
//   if (authLoading || profileLoading) {
//     return (
//       <div className="loading-container">
//         <RiseLoader color="#2e7d32" size={15} />
//       </div>
//     )
//   }

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!user) {
//       return
//     }

//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0]

//       navigate(ROUTES.MENU_SCAN, { state: { file, allowed: true } })
//     }
//   }

//   const handleButtonClick = (event: React.MouseEvent<HTMLLabelElement>) => {
//     if (!user) {
//       event.preventDefault()
//       navigate(ROUTES.LOGIN)
//       return
//     }

//     console.log(profile)

//     if (!profile) {
//       event.preventDefault()
//       navigate(ROUTES.PROFILE)
//     }
//   }

//   return (
//     <div className="image-uploader-container">
//       {user && (
//         <div className="welcome-message">
//           <div className="welcome-message-inner">
//             Welcome, {user.firstName || 'User'}!
//           </div>
//           <p>Ready to discover personalized menu recommendations?</p>
//         </div>
//       )}

//       <div className="upload-message-container">
//         <div>Upload a menu image to receive personalized</div>
//         <span className="green-ai-text">AI-powered</span> recommendations
//       </div>

//       <label className="upload-button" onClick={handleButtonClick}>
//         <span>Upload a Menu</span>
//         <input
//           className="upload-input"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           hidden
//           disabled={!user}
//         />
//       </label>
//     </div>
//   )
// }
import { useState } from 'react'
import { useAuth, useUserProfileContext } from '@context'
import { useNavigate } from 'react-router'
import { ROUTES } from '@constants'
import { RiseLoader } from 'react-spinners'
import './image-uploader.css'

export default function ImageUploader() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useUserProfileContext()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  // If either user or profile is still loading, display a loading indicator.
  if (authLoading || profileLoading) {
    return (
      <div className="loading-container">
        <RiseLoader color="#2e7d32" size={15} />
      </div>
    )
  }

  // Define allowed image MIME types (excluding SVG and similar)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      return
    }

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      // Check if the file type is one of the allowed types
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, GIF, or WebP) only.")
        return
      }

      // Clear any existing error and proceed with navigation.
      setError("")
      navigate(ROUTES.MENU_SCAN, { state: { file, allowed: true } })
    }
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (!user) {
      event.preventDefault()
      navigate(ROUTES.LOGIN)
      return
    }

    console.log(profile)

    if (!profile) {
      event.preventDefault()
      navigate(ROUTES.PROFILE)
    }
  }

  return (
    <div className="image-uploader-container">
      {user && (
        <div className="welcome-message">
          <div className="welcome-message-inner">
            Welcome, {user.firstName || 'User'}!
          </div>
          <p>Ready to discover personalized menu recommendations?</p>
        </div>
      )}

      <div className="upload-message-container">
        <div>Upload a menu image to receive personalized</div>
        <span className="green-ai-text">AI-powered</span> recommendations
      </div>

      {error && <div className="error-message">{error}</div>}

      <label className="upload-button" onClick={handleButtonClick}>
        <span>Upload a Menu</span>
        <input
          className="upload-input"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          hidden
          disabled={!user}
        />
      </label>
    </div>
  )
}
