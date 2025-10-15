import { Spinner } from "../ui/spinner";

export default function CustomOverlay() {
  return (
    <div className="h-screen bg-black/20 fixed inset-0 flex justify-center items-center z-200">
      <Spinner className="size-16 text-[#818898] " />
    </div>
  );
}
