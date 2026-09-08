import { useState } from "react";
export function useToast() {
  const [toast, setToast] = useState(null);
  const show = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };
  return { toast, show, close: () => setToast(null) };
}
