// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // << IMPORTANTE >>: un solo QueryClient por sesión
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
}
