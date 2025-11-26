import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex items-center gap-8">
      <p className="text-tertiary">
        1 - 20 <span className="text-black">of</span> 197
      </p>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          className="size-8 disabled cursor-not-allowed centered min-w-8 rounded border bg-gray-3 border-gray-2"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          className="size-8 button-hover centered min-w-8 rounded border bg-white border-gray-2"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
