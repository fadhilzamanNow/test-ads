import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoIosPaper } from "react-icons/io";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/routes/_auth/register";
import { FieldSet } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserById } from "@/hooks/useUserById";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeOff } from "lucide-react";

interface EditModalProps {
  open: boolean;
  onClose: (state: boolean) => void;
  userId: string | null;
}

const editUserSchema = registerSchema.omit({ confirm_password: true }).extend({
  password: z
    .string()
    .min(1, { message: "Password masih kosong" })
    .optional()
    .or(z.literal("")),
});

type editUserSchema = z.infer<typeof editUserSchema>;

export default function EditUser({ open, onClose, userId }: EditModalProps) {
  const { data: userData, isLoading } = useUserById(
    userId || "",
    !!userId && open,
  );
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [isPassOpen, setIsPassOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<editUserSchema>({
    resolver: zodResolver(editUserSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (userData?.data) {
      reset({
        username: userData.data.username,
        name: userData.data.name,
        phoneNumber: userData.data.phoneNumber,
        password: "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: editUserSchema) => {
    if (!userId) return;

    // Remove password if empty
    const submitData = { ...data };
    if (!submitData.password) {
      delete submitData.password;
    }

    updateUser(
      { id: userId, data: submitData },
      {
        onSuccess: (res) => {
          toast.success(res.message || "User updated successfully");
          onClose(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update user");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoIosPaper className="text-[#3739EC]" size={20} />
            <span>Edit User</span>
          </DialogTitle>
          <div className="flex flex-col gap-6 mt-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="rounded-md  h-5 w-full bg-[#818898]/20" />
                <Skeleton className="rounded-md  h-5 w-4/5 bg-[#818898]/20" />
                <Skeleton className="rounded-md  h-5 w-3/5 bg-[#818898]/20" />
                <Skeleton className="rounded-md  h-5 w-2/5 bg-[#818898]/20" />
              </div>
            ) : (
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
                  <Input {...register("name")} className="bg-white" />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
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
                  <InputGroup>
                    <InputGroupInput
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
                  {isPending ? "Updating..." : "Edit"}
                </Button>
              </form>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
