import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
type Props = {
  setFile: React.Dispatch<React.SetStateAction<any>>,
  file: any
}

export default function FileUpload({ setFile, file }: Props) {
  const onDrop = useCallback((acceptedFiles: any) => {
    const uploadedFile = acceptedFiles[0];
    const file: any = Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile)
    })
    setFile(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/png': ['.png', '.jpeg'],
      'text/html': ['.html', '.htm'],
    }
  });
  const submitFile = async () => {
    const body = new FormData();
    body.append("file", file, file.name);
    const response = await fetch('/api/cpg/Upload', { method: "POST", body });
    return await response.json();
  }
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ? <p>Drop image here.. </p> : <p>Drag 'n' drop image here  || Click to select Image</p>
        }
      </div>
      <div className="flex items-center justify-center mt-10">
        {file?.preview && (<img
          className="h-50 w-64 object-cover object-center"
          src={file?.preview}
          alt="product image"
        />)}
      </div>
    </div>
  )
}