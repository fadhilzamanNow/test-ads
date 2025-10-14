import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSet, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="flex flex-col gap-6 w-124 items-center ">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="font-semibold text-[40px] -tighter-[2px] leading-6">
          Welcome Back
        </h1>
        <h3 className="text-[#959595] leading-6 text-base">
          Enter your email and password to access your account.
        </h3>
      </div>
      <FieldSet className="flex flex-col gap-6 w-106">
        <FieldGroup className="flex flex-col gap-2">
          <Label>Username</Label>
          <Input />
        </FieldGroup>
        <FieldGroup className="flex flex-col gap-2">
          <Label>Password</Label>
          <InputGroup>
            <InputGroupInput />
            <InputGroupAddon align={"inline-end"}>
              <Eye />
            </InputGroupAddon>
          </InputGroup>
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-between items-center text-sm w-106">
        <div className="gap-1.5 flex items-center">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <span className="text-[#3739EC]">Forgot Your Password?</span>
      </div>
      <Button className="bg-[#3739EC] hover:bg-[#3739EC]/80 w-106">
        Log in
      </Button>
      <div className="border relative bg-[#81818333] text-[#959595] w-106">
        <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3 text-sm">
          Or Login With
        </span>
      </div>
      <div className="flex gap-3 w-106">
        <Button className="flex-1" variant={"outline"}>
          <span className="inline-block size-4"></span>
          <span>Google</span>
        </Button>
        <Button className="flex-1" variant="outline">
          <span className="inline-block size-4"></span>
          <span>Apple</span>
        </Button>
      </div>
      <div className="gap-2 flex text-sm justify-center items-center">
        <span className="text-[#959595]">Don't Have An Account?</span>
        <Link to="/register" className="text-[#3739EC]">
          Register Now
        </Link>
      </div>
    </form>
  );
}
