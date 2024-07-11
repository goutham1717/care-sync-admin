import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cloudImg from "../../../../asssets/cloud-computing.png"
import Image from 'next/image'

type Props = {
  setFile: React.Dispatch<React.SetStateAction<any>>;
  file: any;
};

export default function FileUpload({ setFile, file }: Props) {
  const onDrop = useCallback((acceptedFiles: any) => {
    const uploadedFile = acceptedFiles[0];
    const file: any = Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile),
    });
    setFile(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/png": [".png", ".jpeg"],
      "text/html": [".html", ".htm"],
    },
  });
  const submitFile = async () => {
    const body = new FormData();
    body.append("file", file, file.name);
    const response = await fetch("/api/cpg/Upload", { method: "POST", body });
    return await response.json();
  };
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          <div
            style={{
              backgroundColor: "#edede9",
              borderRadius: 10,
              padding: 20,
              textAlign: "center",
            }}
          >
            {isDragActive ? (
              <p>Drop image here.. </p>
            ) : (
              <p>
                Drag 'n' drop image here
                <br />
                or
                <br />
                Click to select Image
              </p>
            )}
          </div>
        }
      </div>
      <div className="flex items-center justify-center mt-10">
        {file?.preview ? (
          <img
          className="h-50 w-64 object-cover object-center"
          src={file?.preview}
          alt="product image"
        />
        ) : (
          <Image
            className="h-50 w-64 object-cover object-center"
            src={cloudImg}
            alt="default image"
          />
        )}
      </div>
    </div>
  );
}
