import type { Metadata } from "next";
import localFont from "next/font/local";
import "node_modules/modern-normalize/modern-normalize.css";
import "./globals.css";
import Tooltip from "@components/react-tooltip";

export const metadata: Metadata = {
  title: "Shavian Stories | ·𐑖𐑱𐑝𐑾𐑯 𐑕𐑑𐑹𐑦𐑟",
  description:
    "A collection of stories in the Shavian alphabet. | 𐑩 𐑒𐑩𐑤𐑧𐑒𐑖𐑩𐑯 𐑝 𐑕𐑑𐑹𐑦𐑟 𐑦𐑯 𐑞 ·𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑."
};

const orminRegular = localFont({
  display: "swap",
  src: "./ormin-regular.otf",
  variable: "--ormin-regular"
});

const doolittleGaramondItalic = localFont({
  display: "swap",
  src: "./doolittle-garamond-italic.otf",
  variable: "--doolittle-garamond-italic"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orminRegular.variable} ${doolittleGaramondItalic.variable}`}
    >
      <body>
        <main>{children}</main>
        <Tooltip id="latin" />
      </body>
    </html>
  );
}
