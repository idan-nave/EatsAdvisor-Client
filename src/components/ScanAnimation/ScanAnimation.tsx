import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
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
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('http://localhost:8081/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Upload failed')

        const data = await response.json()
        console.log(data)

        setTimeout(() => navigate(ROUTES.RESULTS, { state: { data } }), 2000)

      } catch (err) {
        setError('Upload failed. Please try again.')
      }
    }

    uploadFile()

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, navigate])
 
  return (
    <div className="scan-container">
      {imageSrc && <img src={imageSrc} alt="Scanning" className="scan-image" />}
      <div className="scan-line"></div>
      {error && <div className="upload-status error">{error}</div>}
    </div>
  )
}

export default ScanAnimation