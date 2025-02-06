"use client";

import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
// import styles from "./submit-button.module.css";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export default function SubmitButton({
  children,
  pendingText,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      // className={styles.button}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
