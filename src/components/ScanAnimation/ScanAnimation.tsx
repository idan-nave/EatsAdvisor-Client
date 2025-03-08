import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
import { uploadMenu } from '../../api/api'
import './ScanAnimation.css'

const ScanAnimation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const file: File | null = location.state?.file
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setImageSrc(objectUrl)

    const uploadFile = async () => {
      try {
        // Use the uploadMenu function from api.ts
        const data = await uploadMenu(file)
        
        console.log(data)

        setTimeout(() => navigate(ROUTES.MENU_TABLE, { state: { data } }), 2000)
      } catch (err) {
        setError(err.message || 'Failed to upload menu')
      }
    }

    uploadFile()

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, navigate])

  return (
    <div className="scan-container">
      {!error && imageSrc && (
        <img src={imageSrc} alt="Scanning" className="scan-image" />
      )}
      {!error && <div className="scan-line"></div>}
      {error && (
        <div className="upload-status error">
          {error}
          <div
            className="go-back-home"
            onClick={() => {
              navigate(ROUTES.HOME)
            }}
          >
            Try again
          </div>
        </div>
      )}
    </div>
  )
}

export default ScanAnimation
