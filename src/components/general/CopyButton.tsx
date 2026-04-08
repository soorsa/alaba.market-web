import { Copy } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type CopyButtonProps = {
  text?: string | number | null;
  className?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(text));
      toast.success("Copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");

      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${className} flex gap-1 text-[9px] items-center text-gray-400 cursor-pointer`}
    >
      <Copy className="h-4 w-4" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
