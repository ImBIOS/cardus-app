import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchCardus = () => {
  return (
    <form className="my-4">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            aria-hidden
          />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-full bg-gray-200 p-4 pl-12 text-sm text-gray-900  focus:ring-blue-500  dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
          placeholder="Search cardus"
          required
        />
      </div>
    </form>
  );
};

export default SearchCardus;
