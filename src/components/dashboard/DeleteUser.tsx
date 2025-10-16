import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { toast } from "sonner";

interface DeleteUserProps {
  open: boolean;
  onClose: (state: boolean) => void;
  userId: string | null;
}

export default function DeleteUser({ open, onClose, userId }: DeleteUserProps) {
  const { mutate, isPending } = useDeleteUser();

  const handleDelete = () => {
    if (!userId) return;

    mutate(userId, {
      onSuccess: (res) => {
        toast.success(res.message || "User deleted successfully");
        onClose(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete user");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-100 min-h-[237px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <div className=" bg-[#FEE4E2] rounded-full border-8 border-[#FEF3F2] size-12 flex justify-center items-center">
              <CircleAlert className="text-red-500  " />
            </div>
          </DialogTitle>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm min-h-20 md:min-h-10">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter className="flex justify-between  w-full h-[41px]">
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            className="flex-1 h-full"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 h-full"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
