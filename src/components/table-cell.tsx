"use client";

import { type CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TableCell({
  cellData
}: {
  cellData: CellContext<TableRow, string | number | undefined>;
}) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}${cellData.row.original.path}`}>
      {cellData.getValue()}
    </Link>
  );
}
