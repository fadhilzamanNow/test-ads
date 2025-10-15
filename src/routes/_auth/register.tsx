import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name masih kosong" })
      .max(100, { message: "Maksimum name 100 karakter" }),
    username: z
      .string()
      .min(1, { message: "Username masih kosong" })
      .max(100, { message: "Maksimum username 100 karakter" }),
    password: z
      .string()
      .min(1, { message: "Password masih kosong" })
      .max(100, { message: "Maksimum password berisi 100 karakter" }),
    confirm_password: z.string(),
    phoneNumber: z
      .string()
      .min(1, { message: "Nomor telefon masih kosong" })
      .max(20, { message: "Masukkan nomor telepon yang valid" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });

function RouteComponent() {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isConfOpen, setIsConfOpen] = useState(false);

  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    register(
      {
        name: data.name,
        username: data.username,
        phoneNumber: data.phoneNumber,
        password: data.password,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          reset();
          navigate({ to: "/login" });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          <Label className="text-xs">Name</Label>
          <Input {...registerField("name")} className="" />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label className="text-xs">Username</Label>
          <Input {...registerField("username")} />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label className="text-xs">Phone Number</Label>
          <Input {...registerField("phoneNumber")} />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label className="text-xs">Password</Label>
          <InputGroup>
            <InputGroupInput
              {...registerField("password")}
              type={isPassOpen ? "text" : "password"}
            />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsPassOpen((a) => !a)}
            >
              {isPassOpen ? <EyeOff /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </FieldGroup>
        <FieldGroup className="gap-2">
          <Label className="text-xs">Confirm Password</Label>
          <InputGroup>
            <InputGroupInput
              {...registerField("confirm_password")}
              type={isConfOpen ? "text" : "password"}
            />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsConfOpen((a) => !a)}
            >
              {isConfOpen ? <EyeOff /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
          {errors.confirm_password && (
            <p className="text-red-500 text-xs">
              {errors.confirm_password.message}
            </p>
          )}
        </FieldGroup>
      </FieldSet>
      <Button
        className="w-106 bg-[#3739EC] hover:bg-[#3739EC]/80"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Register"}
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
