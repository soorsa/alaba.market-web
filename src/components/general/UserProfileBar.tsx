import { CalendarDays, Mail } from "lucide-react";
import { formatDate } from "../../utils/formatter";
import { useUserStore } from "../../zustand/useUserStore";

const UserProfileBar = () => {
  const { user } = useUserStore();
  return (
    <div className="flex items-start text-left gap-4 rounded-2xl p-5 bg-linear-to-r from-alaba to-alaba-dark-800 text-white">
      <div className="rounded-full h-25 w-25 border-4 border-white overflow-hidden">
        <img
          src={user?.profile_pic || ""}
          alt={user?.first_name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1 text-sm">
        <div className="text-2xl">
          {user?.first_name} {user?.last_name}
        </div>
        <div className="capitalize border border-gray-300 rounded-2xl w-fit px-4 text-xs">
          {user?.role}
        </div>
        <div className="flex items-center gap-1">
          <Mail size={15} />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays size={15} />
          <span>Joined {formatDate(user?.date_joined || "")}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBar;
