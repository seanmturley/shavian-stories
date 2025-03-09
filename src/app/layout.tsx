import localFont from "next/font/local";
import "node_modules/modern-normalize/modern-normalize.css";
import "./globals.css";

const interAlia = localFont({
  src: "./inter-alia-vf.otf",
  fallback: ["system-ui"]
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // className={`${orminRegular.className} ${doolittleGaramondItalic.variable}`}
      className={interAlia.className}
    >
      <body>{children}</body>
    </html>
  );
}
