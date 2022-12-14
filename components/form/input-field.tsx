import { UseFormRegister } from "react-hook-form";

type Props = {
  id?: string;
  flavour?: "title" | "subtitle" | "body";
  className?: string;
  register?: UseFormRegister<any>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ id, flavour, className, register, ...props }: Props) => {
  const flavourClassName =
    flavour === "title"
      ? "text-4xl font-semibold leading-3"
      : flavour === "subtitle"
      ? "font-light"
      : // body/default
        "text-lg";

  if (register)
    return (
      <input
        className={`w-full bg-transparent outline-none ${className} ${flavourClassName}`}
        id={id}
        {...register(id as string)}
        {...props}
      />
    );

  return (
    <input
      className={`w-full bg-transparent outline-none ${className} ${flavourClassName} ${
        props.readOnly ? "text-ellipsis" : ""
      }`}
      id={id}
      {...props}
    />
  );
};

export default InputField;
