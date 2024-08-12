import React from "react";
import {
  Button,
  Textarea,
  ThemeProvider
} from "@material-tailwind/react";
import { json2csv } from 'json-2-csv';


export default function Barcode() {
  const handleSubmit = async () => {
    try {
      const textArea: HTMLTextAreaElement | null = document.getElementById('cpg-json') as HTMLTextAreaElement;
      if (textArea) {
        const JSONObject = JSON.parse(textArea.value);
        const processed = JSONObject.tabs[0].product_info.products.map((product: any) => {
          const { absolute_url, ean_code, brand, desc } = product;
          const url = `https://www.bigbasket.com/${absolute_url}`
          const barcode = ean_code;
          const productName = `${brand.name} ${desc}`;
          return {
            url,
            barcode,
            productName
          }
        });
        const csv = await json2csv(processed);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cpg.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
    }
  }
  return (
    <ThemeProvider>
      <h1>Download Product Details </h1>
      <Textarea onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} id="cpg-json" rows={10} />
      <Button
        onClick={handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        GENERATE
      </Button>
    </ThemeProvider>
  )
}