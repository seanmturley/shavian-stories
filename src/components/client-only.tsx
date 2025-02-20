import { useEffect, useState } from "react";

export default function ClientOnly({
  children
}: {
  children: React.ReactNode;
}) {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient ? children : null;
}
