import { ImageUploader } from '@components'
import './home.css'

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <ImageUploader />
      </div>
    </div>
  )
}
