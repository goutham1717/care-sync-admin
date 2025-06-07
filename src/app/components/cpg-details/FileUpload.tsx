import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import cloudImg from "../../../../asssets/cloud-computing.png"
import Image from 'next/image'

type Props = {
  setFile: React.Dispatch<React.SetStateAction<any>>;
  file: any;
  url: string;
};

export default function FileUpload({ setFile, file, url }: Props) {
  const onDrop = useCallback((acceptedFiles: any) => {
    const uploadedFile = acceptedFiles[0];
    const file: any = Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile),
    });
    setFile(file);
  }, [setFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/png": [".png", ".jpeg"],
      "text/html": [".html", ".htm"],
    },
  });
  useEffect(() => {
    return () => {
      setFile(null);
    }
  }, [setFile]);
  const submitFile = async () => {
    const body = new FormData();
    body.append("file", file, file.name);
    const response = await fetch("/api/cpg/Upload", { method: "POST", body });
    return await response.json();
  };
  const getURL = () => {
    if (file) {
      return file?.preview
    }
    if (!file && url) {
      return url
    }
    return null;
  }
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
        {getURL() ? (
          <Image
            className="h-50 w-64 object-cover object-center"
            src={getURL()}
            alt="product image"
            width={256}
            height={200}
          />
        ) : (
          <Image
            className="h-50 w-64 object-cover object-center"
            src={cloudImg}
            alt="default image"
            width={256}
            height={200}
          />
        )}
      </div>
    </div>
  );
}
