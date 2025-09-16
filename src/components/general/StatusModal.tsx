import { CheckCircle2, Info, Timer } from "lucide-react";
import React from "react";
interface Props {
  status: "success" | "pending" | "failed";
  desc: string;
}
const StatusModal: React.FC<Props> = ({ status, desc }) => {
  return (
    <div className="p-4 mx-auto space-y-3">
      {status == "success" && <CheckCircle2 />}
      {status == "pending" && <Timer />}
      {status == "failed" && <Info />}
      <h3 className=" capitalize">{status}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default StatusModal;
