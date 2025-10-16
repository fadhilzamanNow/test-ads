import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const loaderData = Route.useLoaderData();

  console.log("value dari loaderData : ", loaderData);

  console.log("");
  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <Outlet />
    </React.Fragment>
  );
}
