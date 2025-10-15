import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";

interface DeleteUserProps {
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function DeleteUser({ open, onClose }: DeleteUserProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new user.
            <CircleAlert />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
