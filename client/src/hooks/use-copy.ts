import { useState } from "react";

type CopyStatus = "success" | "error" | "idle";
export function useCopy(onCopy?: (text: string) => void) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copyToClipboard = async (text: string) => {
    try {
      if (onCopy) {
        onCopy(text);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  };

  return {
    status,
    copyToClipboard,
  };
}
