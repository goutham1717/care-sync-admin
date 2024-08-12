import { Button, Card, CardBody, CardHeader, Drawer, IconButton, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import axios from 'axios';
import CpgForm from './CpgForm';

type Props = {}
const TABLE_HEAD = ['Bar code', 'Product Name', 'size', '']
const CpgList = (props: Props) => {
  async function fetchServerPage(
    cursor: any
  ): Promise<{ rows: Array<any>; nextOffset: any, hasNextPage: boolean }> {
    console.log("COMING HERE");
    const cursorValue = cursor ? `"${cursor}"` : null
    const query = {
      query: `query GetProducts {
      getProducts(cursor:${cursorValue}) {
          hasNextPage
          totalCount
          edges {
              cursor
              node {
                  barCode
                  createdAt
                  healthScore
                  imageURL
                  ingrediants
                  nutritionalFacts
                  productName
                  size
                  suggestion
                  updatedAt
              }
          }
      }
  }`}
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
      return {
        hasNextPage: response.data.data.getProducts.hasNextPage,
        rows: response.data.data.getProducts.edges, nextOffset: response.data.data.getProducts.edges[
          response.data.data.getProducts.edges.length - 1
        ].cursor
      }
    } catch (e) {
      console.log("Error", e);
      return {
        rows: [], nextOffset: null, hasNextPage: false
      }
    }
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: (ctx) => {
      console.log("CTX", ctx);
      return fetchServerPage(ctx.pageParam);
      // return fetchServerPageTest(10, ctx.pageParam)
    },
    getNextPageParam: (lastGroup: any) => {
      console.log("lastGroup.nextOffset", lastGroup.nextOffset);
      return lastGroup.nextOffset;
    },
    initialPageParam: null,
  })

  const allRows = data ? data.pages.flatMap((d) => d.rows) : []

  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  return (
    <>
      <Card className="h-full w-full" >
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-2 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Consumer Packaged Goods List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                List of all availabe goods in Care Sync
              </Typography>
            </div>
            <Button onClick={() => { setOpenDrawer(true) }}>Add  a product</Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className=" w-full min-w-max table-auto text-left" ref={parentRef}>
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {
              status === 'pending' ? (
                <p>Loading...</p>
              ) : status === 'error' ? (
                <span>Error: {error?.message}</span>
              ) : (
                <>
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const isLoaderRow = virtualRow.index > allRows.length - 1;
                    const { index } = virtualRow;
                    const product = allRows[virtualRow.index];
                    const node = product?.node;
                    if (!product) {
                      return (<></>)
                    }
                    return (
                      <tbody
                        key={virtualRow.index}
                      >
                        {isLoaderRow && product?.node
                          ? hasNextPage
                            ? 'Loading more...'
                            : 'Nothing more to load'
                          :
                          <tr key={node.barCode} className={index % 2 !== 0 ? `bg-blue-gray-50/50` : ''}>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {node.barCode}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {node.productName}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {node.size}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" onClick={
                                () => {
                                  setSelectedItem(node);
                                  setOpenDrawer(true);
                                }
                              }>
                                Edit
                              </Typography>
                            </td>
                          </tr>
                        }
                      </tbody>
                    );
                  })}
                </>
              )
            }

          </table>
        </CardBody>
      </Card>
      <Drawer
        placement="right"
        open={openDrawer}
        size={900}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedItem(null);
        }}
        className="p-4 w-9/12"
      >
        <>
          <div className="flex items-center justify-between px-4 pb-2">
            <Typography variant="h5" color="blue-gray">
              Add Product Details
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={() => setOpenDrawer(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <CpgForm selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </>
      </Drawer>

    </>
  )

}

export default CpgList;