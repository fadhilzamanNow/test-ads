import {
  Dialog,
  DialogContent,
  DialogDescription,
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
interface CreateUserProps {
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function CreateUser({ open, onClose }: CreateUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<z.infer<typeof registerSchema>, "confirm_password">>({
    resolver: zodResolver(registerSchema.omit({ confirm_password: true })),
    mode: "onChange",
  });

  const onSubmit = (
    data: Omit<z.infer<typeof registerSchema>, "confirm_password">,
  ) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoIosPaper className="text-[#3739EC]" size={20} />
            <span>Create User</span>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-6 mt-6">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Username</Label>
                <Input {...register("username")} />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Name</Label>
                <Input {...register("name")} />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Telephone Number</Label>
                <Input {...register("phoneNumber")} />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </FieldSet>
              <FieldSet className="gap-2 flex flex-col">
                <Label className="">Password</Label>
                <Input {...register("password")} />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </FieldSet>
              <Button type="submit" className="w-39 h-[41px] mx-auto">
                Create
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
