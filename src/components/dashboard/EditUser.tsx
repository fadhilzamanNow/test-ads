import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditModalProps {
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function EditUser({ open, onClose }: EditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edi tUser</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new user.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
