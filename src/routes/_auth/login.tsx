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
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/api/auth/auth";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";
import type z from "zod";
import { setAuthToken } from "@/lib/auth";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPassOpen, setIsPassOpen] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Login successful");
        setAuthToken(res.data.token);
        navigate({ to: "/dashboard" });
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-6 w-124 items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
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
          <Label className="text-xs">Username</Label>
          <Input placeholder="Username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </FieldGroup>
        <FieldGroup className="flex flex-col gap-2">
          <Label className="text-xs">Password</Label>
          <InputGroup>
            <InputGroupInput
              placeholder="Password"
              {...register("password")}
              type={isPassOpen ? "text" : "password"}
            />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsPassOpen((prev) => !prev)}
            >
              {isPassOpen ? <EyeOff /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-between items-center  w-106 ">
        <div className="gap-1.5 flex items-center">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <span
          className="text-[#3739EC] text-sm cursor-pointer"
          onClick={() =>
            toast.info("Feature not implemented yet. Coming soon!")
          }
        >
          Forgot Your Password?
        </span>
      </div>
      <Button
        className="bg-[#3739EC] hover:bg-[#3739EC]/80 w-106"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Log in"}
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
