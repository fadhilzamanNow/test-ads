import { Link } from "@tanstack/react-router";

export default function CaseTab() {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-4 rounded-lg p-8">
      <h1 className="text-4xl font-bold text-[#3739EC]">Case</h1>
      <p className="text-[#818898] text-lg flex gap-1">
        Belum dibikin, cek
        <Link
          to="/dashboard/$menu"
          params={{ menu: "users" }}
          className="text-[#3739EC] underline"
        >
          User Management
        </Link>
        dulu aja
      </p>
    </div>
  );
}
