type Props = {
  children: React.ReactNode;
  flavour?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, flavour = "primary", ...props }: Props) => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 dark:text-blue-200 ${
        flavour === "primary"
          ? "bg-blue-100 text-blue-200 active:bg-blue-200 dark:text-blue-900 dark:active:bg-blue-800"
          : "bg-transparent text-blue-900 active:bg-blue-800 dark:text-blue-200 dark:active:bg-blue-200"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
