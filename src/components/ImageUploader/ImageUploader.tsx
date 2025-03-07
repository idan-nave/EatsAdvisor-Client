// import { useState } from 'react'
// import { useAuth } from '@context';
// import { useNavigate } from 'react-router';
// import './image-uploader.css'

// export default function ImageUploader() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!user) {
//       return;
//     }

//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];

//       if (!file.type.startsWith('image/')) {
//         setErrorMessage('Please select a valid image file (e.g., JPG, PNG).');
//         return;
//       }

//       setIsLoading(true);
//       setErrorMessage(null); 

//       navigate('/scan', { state: { file } });

//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         const response = await fetch('http://localhost:8080/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error('Upload failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         setErrorMessage('Something went wrong. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleButtonClick = (event: React.MouseEvent<HTMLLabelElement>) => {
//     if (!user) {
//       event.preventDefault(); 
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="image-uploader-container">
//       <div>
//         <div>Upload a menu image to receive personalized</div>
//         <span className="green-ai-text">AI-powered</span> recommendations
//       </div>

//       <label className="upload-button" onClick={handleButtonClick}>
//         {isLoading ? 'Uploading...' : 'Upload a Menu'}
//         <input
//           className="upload-input"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           hidden
//           disabled={isLoading || !user}
//         />
//       </label>

//       {errorMessage && <div className="upload-status error">{errorMessage}</div>}
//     </div>
//   );
// }
import { useState } from 'react';
import { useAuth } from '@context';
import { useNavigate } from 'react-router';
import './image-uploader.css';

export default function ImageUploader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      return;
    }

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file (e.g., JPG, PNG).');
        return;
      }

      setErrorMessage(null);
      navigate('/scan', { state: { file } }); // Pass the file to ScanAnimation
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (!user) {
      event.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="image-uploader-container">
      <div>
        <div>Upload a menu image to receive personalized</div>
        <span className="green-ai-text">AI-powered</span> recommendations
      </div>

      <label className="upload-button" onClick={handleButtonClick}>
        Upload a Menu
        <input
          className="upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          disabled={!user}
        />
      </label>

      {errorMessage && <div className="upload-status error">{errorMessage}</div>}
    </div>
  );
}
