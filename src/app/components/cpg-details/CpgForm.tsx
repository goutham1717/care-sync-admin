
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FileUpload from './FileUpload';

interface IFormInput {
  barcode: string;
  productName: string;
  size: string;
  ingrediants: string;
  nutritionalFacts: string;
  image: any
}

export default function CpgForm() {
  const [file, setFile] = useState<any>();
  const { control, handleSubmit, setValue, reset, formState: { isValid } } = useForm<IFormInput>(
    {
      defaultValues: {
        barcode: '',
        productName: '',
        size: '',
        ingrediants: '',
        nutritionalFacts: '',
      }
    }
  );

  useEffect(() => {
    setValue('image', file);
  }, [file]);

  const addGpgDetails = async (barCode: string, productName: string,
    size: string, nutritionalFacts: string, ingrediants: string, imageURL: string) => {

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
  `
    }
    try {
      const response = await axios.post(process.env.CARE_SYNC_ENDPOINT || 'http://localhost:3000/graphql', query, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("response", response);
      reset();
      return response;
    } catch (e) {
      console.error(e);
    }

  }

  const onSubmit = async (data: any) => {
    const body = new FormData();
    if (data.image && data?.image.name) {
      body.append("file", data.image, data?.image.name);
    }
    const response: any = await fetch('/api/cpg', {
      method: "POST", body
    });
    const responseJSON = await response.json();
    if (responseJSON && responseJSON.URL) {
      const product = await addGpgDetails(data.barcode, data.productName, data.size,
        data.nutritionalFacts, data.ingrediants, responseJSON.URL);
    }
  };
  return (
    <section className="flex gap-20 mt-5">
      <Card placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4">
          <Controller
            name="barcode"
            control={control}
            render={({ field }) => {
              return (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Bar Code
                  </Typography>
                  <Input
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} size="lg"
                    placeholder="80123690"
                    {...field}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} />
                </div>
              )
            }}
          />
          <Controller
            name="productName"
            control={control}
            render={({ field }) => {
              return (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Product Name
                  </Typography>
                  <Input
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} size="lg"
                    {...field}
                    placeholder="Lays Classic chips"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} />
                </div>
              )
            }}
          />
          <Controller
            name="size"
            control={control}
            render={({ field }) => {
              return (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                    Size
                  </Typography>
                  <Input
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} size="lg"
                    placeholder="25 mg"
                    {...field}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} />
                </div>
              )
            }}
          />
          <Controller
            name="ingrediants"
            control={control}
            render={({ field }) => {
              return (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                    Ingrediants
                  </Typography>
                  <Textarea
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} size="lg"
                    placeholder="Sugar, Salt, Preservatives"
                    {...field}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} />
                </div>
              )
            }}
          />
          <Controller
            name="nutritionalFacts"
            control={control}
            render={({ field }) => {
              return (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                    Nutritional Facts
                  </Typography>
                  <Textarea
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} size="lg"
                    placeholder="Energy 313 kcal, Fat 21.15 g,"
                    {...field}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} />
                </div>
              )
            }}
          />
          <Button className="mt-6" fullWidth onClick={handleSubmit(onSubmit)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
            Submit
          </Button>
        </form>
      </Card>
      <Card variant="filled" className="p-10" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <FileUpload setFile={setFile} file={file} />
      </Card>
    </section>
  )
}