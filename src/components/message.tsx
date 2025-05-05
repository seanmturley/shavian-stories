"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Message() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.show();
  }, [message]);

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog ref={dialogRef}>
      <p>{message}</p>
      <button onClick={closeDialog}>x</button>
    </dialog>
  );
}
