import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isConfOpen, setIsConfOpen] = useState(false);
  return (
    <form className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-semibold text-[40px] leading-6 -tracking-[2px]">
          Create an Account
        </h1>
        <h3 className="text-[#959595]">
          Join now to streamline your experience from day one.
        </h3>
      </div>
      <FieldSet className="w-106 flex flex-col gap-6">
        <FieldGroup className="gap-2">
          <Label>Name</Label>
          <Input placeholder="Nama" />
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label>Username</Label>
          <Input placeholder="Username" />
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label>Password</Label>
          <InputGroup>
            <InputGroupInput placeholder="Password" />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsPassOpen((a) => !a)}
            >
              {isPassOpen ? <EyeOff /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label>Password</Label>
          <InputGroup>
            <InputGroupInput placeholder="Password" />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsConfOpen((a) => !a)}
            >
              {isConfOpen ? <EyeOff /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
        </FieldGroup>
      </FieldSet>
      <Button className="w-106 bg-[#3739EC] hover:bg-[#3739EC]/80">
        Register
      </Button>
      <div className="border-1 w-106 h-0 relative border-[#81818333] text-[#959595] text-sm">
        <div className="absolute bg-white px-4 top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
          Or register with
        </div>
      </div>
      <div className="flex gap-3  mt-4 text-[#545454] w-106 text-sm">
        <Button className="flex-1 flex " variant="outline">
          <span className="inline-block size-4  bg-[#D9D9D9]"></span>
          <span>Google</span>
        </Button>
        <Button className="flex-1" variant="outline">
          <span className="inline-block size-4  bg-[#D9D9D9]"></span>
          <span>Apple</span>
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2 text-sm">
        <span className="text-[#959595]">Already have An Account?</span>
        <Link to="/login" className="text-[#3739EC] cursor-pointer">
          Sign In.
        </Link>
      </div>
    </form>
  );
}
