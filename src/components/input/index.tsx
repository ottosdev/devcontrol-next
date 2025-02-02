"use client";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input(props: InputProps) {
  return (
    <>
      <input
        className="w-full border-2 rounded-md px-2 h-11"
        placeholder={props.placeholder}
        type={props.type}
        id={props.name}
        {...props.register(props.name, props.rules)}
      />
      {props.error && <p className="my-1 text-red-500">{props.error}</p>}
    </>
  );
}
