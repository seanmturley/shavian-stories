import type { Metadata } from "next";
import Tooltip from "@components/react-tooltip";

export const metadata: Metadata = {
  title: "Shavian Stories | ·𐑖𐑱𐑝𐑾𐑯 𐑕𐑑𐑹𐑦𐑟",
  description:
    "A collection of stories in the Shavian alphabet. | 𐑩 𐑒𐑩𐑤𐑧𐑒𐑖𐑩𐑯 𐑝 𐑕𐑑𐑹𐑦𐑟 𐑦𐑯 𐑞 ·𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑."
};

const tooltipStyle = {
  fontSize: "2.8em",
  color: "hsl(0, 0%, 10%)",
  backgroundColor: "darkgoldenrod"
};

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Tooltip
        id="latin"
        className="tooltip"
        style={tooltipStyle}
        opacity={1}
      />
      <Tooltip
        id="latin-emphasis"
        className="tooltip"
        style={{
          ...tooltipStyle,
          fontStyle: "italic"
        }}
        opacity={1}
      />
    </>
  );
}
