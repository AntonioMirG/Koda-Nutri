import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

export function useCamera() {
  const takePicture = async () => {
    try {
      // 1. Capture photo natively
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      // 2. Fetch the image and convert to WebP using Canvas
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      
      const webpBlob = await convertToWebP(blob);
      
      // 3. Convert Blob to Base64 to save locally or send to Firebase
      const base64Data = await blobToBase64(webpBlob);
      
      // 4. Save to temporary filesystem cache
      const fileName = `scan_${Date.now()}.webp`;
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache
      });

      return {
        filepath: savedFile.uri,
        webviewPath: image.webPath,
        base64: base64Data, // Ready to send to Firebase Storage
        format: 'webp'
      };
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  };

  const convertToWebP = (blob) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Redimensionamiento básico para optimizar subida
        const MAX_WIDTH = 1080;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((webpBlob) => {
          resolve(webpBlob);
        }, 'image/webp', 0.8);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Strip out the data URL prefix to get raw base64
        const base64String = reader.result;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return { takePicture };
}
