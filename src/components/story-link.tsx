"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StoryLink({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  const currentPath = usePathname();

  const returnTo = `?return=${currentPath}`;

  return <Link href={`${href}${returnTo}`}>{children}</Link>;
}
