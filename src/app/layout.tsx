import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shavian Stories | ·𐑖𐑱𐑝𐑾𐑯 𐑕𐑑𐑹𐑦𐑟",
  description:
    "A collection of stories in the Shavian alphabet. | 𐑩 𐑒𐑩𐑤𐑧𐑒𐑖𐑩𐑯 𐑝 𐑕𐑑𐑹𐑦𐑟 𐑦𐑯 𐑞 ·𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
