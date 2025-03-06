"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function StoryReturnLink() {
  const searchParams = useSearchParams();

  const returnPath = searchParams.get("return");

  return <Link href={returnPath ?? "/"}>{"<"}</Link>;
}
