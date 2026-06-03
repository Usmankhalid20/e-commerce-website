import { Loader2 } from "lucide-react";

const PageLoader = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-stone-500">
        <Loader2 className="size-8 animate-spin" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

export default PageLoader;
