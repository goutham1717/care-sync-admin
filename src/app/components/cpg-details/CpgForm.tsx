import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  barcode: string;
  productName: string;
  size: string;
  ingrediants: string;
  nutritionalFacts: string;
  image: any;
}

export default function CpgForm() {
  const [file, setFile] = useState<any>();
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      barcode: "",
      productName: "",
      size: "",
      ingrediants: "",
      nutritionalFacts: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("image", file);
    setIsImageUploaded(!!file); // Set isImageUploaded based on whether file is truthy
  }, [file, setValue]);

  const addGpgDetails = async (
    barCode: string,
    productName: string,
    size: string,
    nutritionalFacts: string,
    ingrediants: string,
    imageURL: string
  ) => {
    const query = {
      query: `
    mutation {
      addCpgDetails(
        cpgInput: {
          barCode: "${barCode}"
          productName: "${productName}"
          size: "${size}"
          nutritionalFacts: "${nutritionalFacts}"
          ingrediants: "${ingrediants}"
          imageURL:  "${imageURL}"
        }
      ) {
        barCode
      }
    }
  `,
    };
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CARE_SYNC_ENDPOINT || "http://localhost:3000/graphql",
        query,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
      reset();
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data: any) => {
    const body = new FormData();
    if (data.image && data?.image.name) {
      body.append("file", data.image, data?.image.name);
    }
    try {
      const response: any = await fetch("/api/cpg", {
        method: "POST",
        body,
      });
      const responseJSON = await response.json();
      console.log("responseJSON", responseJSON, responseJSON.URL)
      if (responseJSON && responseJSON.URL) {
        await addGpgDetails(
          data.barcode,
          data.productName,
          data.size,
          data.nutritionalFacts,
          data.ingrediants,
          responseJSON.URL
        );
        if (response.ok) {
          toast.success("Form submitted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      toast.error("Failed to submit the form!");
      console.error(error);
    }
  };

  return (
    <section className="flex gap-20 mt-5">
      <Card
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <form className="my-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4 pb-5">
          <Controller
            name="barcode"
            control={control}
            rules={{ required: "Bar Code is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Bar Code
                </Typography>
                <Input
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...field}
                  placeholder="80123690"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  error={!!error}
                />
                {error && (
                  <Typography
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="productName"
            control={control}
            rules={{ required: "Product Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Product Name
                </Typography>
                <Input
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...field}
                  placeholder="Lays Classic chips"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  error={!!error}
                />
                {error && (
                  <Typography
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="size"
            control={control}
            rules={{ required: "Size is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Size
                </Typography>
                <Input
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  {...field}
                  placeholder="25 mg"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  error={!!error}
                />
                {error && (
                  <Typography
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="ingrediants"
            control={control}
            rules={{ required: "Ingredients are required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Ingredients
                </Typography>
                <Textarea
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  {...field}
                  placeholder="Sugar, Salt, Preservatives"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  error={!!error}
                />
                {error && (
                  <Typography
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="nutritionalFacts"
            control={control}
            rules={{ required: "Nutritional Facts are required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Nutritional Facts
                </Typography>
                <Textarea
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  {...field}
                  placeholder="Energy 313 kcal, Fat 21.15 g"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  error={!!error}
                />
                {error && (
                  <Typography
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Button
            className={`mt-6 w-full ${!isValid || !isImageUploaded
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white"
              }`}
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !isImageUploaded}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Submit
          </Button>
        </form>
      </Card>
      <Card
        variant="filled"
        className="p-10"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <FileUpload setFile={setFile} file={file} />
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}
