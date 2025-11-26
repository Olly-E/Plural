import { FingerprintPattern, ListFilter } from "lucide-react";
import { SearchNormal1 } from "iconsax-react";
import { ChangeEvent } from "react";

const DashboardSearchInput = ({
  handleSearch,
}: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-4 mt-4 items-center h-10 outline-none bg-white pl-3 pr-[3px] bg-gray-250 opacity-70 border border-gray-2 rounded-[10px] mx-auto">
      <div className="flex items-center gap-3 w-full">
        <SearchNormal1 size={20} color="var(--color-gray-1)" />
        <input
          className="focus:border-0 outline-none text-[14px] w-full bg-transparent placeholder:text-base placeholder:text-gray-1 text-black"
          placeholder="Find patient"
          onChange={handleSearch}
        />
      </div>
      <div className="flex items-center gap-1">
        <button className="centered size-8 min-w-8 transition-colors hover:bg-primary/10 rounded-md duration-200">
          <FingerprintPattern color="#A6AFC2" size={16} />
        </button>
        <button
          type="button"
          className="centered size-8 min-w-8 transition-colors hover:bg-primary/10 rounded-md duration-200"
        >
          <ListFilter color="#A6AFC2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default DashboardSearchInput;
