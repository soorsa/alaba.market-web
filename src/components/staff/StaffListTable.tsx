import { useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import SmallLoader from "../general/SmallLoader";
import NoProductFound from "../shop/NoProductFound";
import type { User } from "../../zustand/useUserStore";
import Paginator from "./Paginator";
import { useGetStaff } from "../../hooks/querys/useGetCustomers";

const StaffListTable = () => {
  const [selectedItem, setselectedItem] = useState<User[]>([]); // Store product_ids
  const [page, setpage] = useState(1);
  const { data, isLoading, isError } = useGetStaff(page);
  const customers = data?.results ?? [];
  const handleDelete = (user: User) => {
    console.log(user);
  };
  const handleSelectOrder = (user: User, isChecked: boolean) => {
    setselectedItem((prev) =>
      isChecked
        ? [...prev, user]
        : prev.filter((item) => item.username !== user.username)
    );
  };

  const viewOrder = (user: User) => {
    console.log(user);
    // openModal(<OrderSummary order={order} />, "Order Summary", "dark");
  };

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {customers?.map((user, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded-lg gap-2 text-gray-300 even:bg-alaba-dark-800 flex justify-between items-center`}
          >
            <label className="flex justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedItem.includes(user)}
                onChange={(e) => handleSelectOrder(user, e.target.checked)}
                className="w-6 h-6 peer hidden appearance-none border-1 border-gray-700 rounded-lg checked:bg-alaba hover:border-alaba/50 cursor-pointer"
              />
              <div
                className={`p-1 border-1 peer-checked:text-alaba peer-checked:border-alaba border-gray-700 rounded-lg ${
                  selectedItem.includes(user)
                    ? "text-alaba border-alaba"
                    : "text-gray-700 hover:border-gray-300 hover:text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
            </label>
            <div
              className="flex-1 min-w-0 text-left overflow-hidden"
              onClick={() => viewOrder(user)}
            >
              <div className="min-w-0">
                <div className="font-semibold text-xs md:text-sm truncate">
                  {user.first_name} {user.last_name}
                </div>
                <div className="text-xs truncate">
                  <span>Email: </span>
                  <span className="text-blue-500">{user.email}</span>
                </div>{" "}
              </div>
            </div>
            <div className="text-right h-full flex flex-col justify-between gap-1 text-xs">
              <div className="">{user.role}</div>
              <div className="flex gap-2 justify-end">
                <div
                  className="flex gap-1 items-center text-blue-300"
                  //   onClick={() => handleEdit(order)}
                >
                  <Edit size={15} />
                </div>
                <div
                  className="flex gap-1 items-center text-red-300"
                  onClick={() => handleDelete(user)}
                >
                  <Trash2 size={15} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    if (customers?.length === 0) {
      return (
        <div className="text-center py-4">
          <NoProductFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="">
      {renderContent()}
      <Paginator
        currentPage={page}
        totalPages={Math.ceil((data?.count || 0) / 10)}
        onPageChange={setpage}
      />
    </div>
  );
};

export default StaffListTable;
