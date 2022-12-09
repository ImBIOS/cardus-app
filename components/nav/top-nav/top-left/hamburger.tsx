import { useMemo } from "react";

type Props = {
  open: boolean;
};

const Hamburger = ({ open }: Props) => {
  const genericHamburgerLine = useMemo(
    () =>
      "h-1 w-8 my-1 rounded-full bg-black transition ease transform duration-300 bg-neutral-200",
    []
  );

  return (
    <>
      <div
        className={`${genericHamburgerLine} ${
          open
            ? "translate-y-3 rotate-45 group-hover:opacity-100"
            : "group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          open ? "opacity-0" : "group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          open
            ? "-translate-y-3 -rotate-45 group-hover:opacity-100"
            : "group-hover:opacity-100"
        }`}
      />
    </>
  );
};

export default Hamburger;
