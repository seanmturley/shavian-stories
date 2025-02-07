import localFont from "next/font/local";
import "node_modules/modern-normalize/modern-normalize.css";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
