import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoIosPaper } from "react-icons/io";
import { FieldSet } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/routes/_auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useCreateUser } from "@/hooks/useCreateUser";
import { toast } from "sonner";
interface CreateUserProps {
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function CreateUser({ open, onClose }: CreateUserProps) {
  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<z.infer<typeof registerSchema>, "confirm_password">>({
    resolver: zodResolver(registerSchema.omit({ confirm_password: true })),
    mode: "onChange",
  });

  const onSubmit = (
    data: Omit<z.infer<typeof registerSchema>, "confirm_password">,
  ) => {
    createUser(data, {
      onSuccess: (res) => {
        toast.success(res.message || "User created successfully");
        reset();
        onClose(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create user");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoIosPaper className="text-[#3739EC]" size={20} />
            <span>Create User</span>
          </DialogTitle>
          <div className="flex flex-col gap-6 mt-6">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Username</Label>
                <Input {...register("username")} />
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors.username.message}
                  </p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Name</Label>
                <Input {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Telephone Number</Label>
                <Input {...register("phoneNumber")} />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Password</Label>
                <Input {...register("password")} />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </FieldSet>
              <Button
                type="submit"
                className="w-39 h-[41px] mx-auto"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
