'use client';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import React from "react";
import {ReactQueryDevtools} from "react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  }
})

export const getQueryClient = () => {
    return queryClient
}

export default function QueryProvider({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools initialIsOpen={true} />*/}
    </QueryClientProvider>
  )
}


