import React, { useState } from "react";
import type { Vendor } from "../../hooks/querys/useGetVendors";
import Button from "../general/Button";
import { Check, X } from "lucide-react";
import ImageViewer from "./ImageViewer";
interface Props {
  vendor: Vendor;
}
const VendorDetail: React.FC<Props> = ({ vendor }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = [
    {
      src: `${vendor.profile_pic}`,
      alt: "User Photo",
    },
    {
      src: `${vendor.cac_upload}`,
      alt: "CAC Photo",
    },
    {
      src: `${vendor.user_passport}`,
      alt: "User ID photo",
    },
  ];
  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  };
  return (
    <div className="md:w-[350px]">
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => openImageViewer(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[55px] object-cover rounded-lg shadow-lg"
            />
            <p className="mt-1 text-gray-700 text-xs line-clamp-1 text-left">
              {image.alt}
            </p>
          </div>
        ))}
      </div>
      {isViewerOpen && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setIsViewerOpen(false)}
          showThumbnails={true}
          showControls={true}
          enableZoom={true}
          enableFullscreen={true}
        />
      )}
      <div className="divide-y-1 divide-gray-700 text-left text-xs text-gray-400">
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            FullName:
          </div>
          <div className="">
            {vendor.last_name} {vendor.first_name}
          </div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Name:
          </div>
          <div className="">{vendor.business_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Email:
          </div>
          <div className="">{vendor.business_email || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bussiness Phone No.:
          </div>
          <div className="">{vendor.phone_number || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Office Address:
          </div>
          <div className="">{vendor.office_address || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            CAC No.:
          </div>
          <div className="">{vendor.cac_number || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Identity No.(NIN):
          </div>
          <div className="">{vendor.nin || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            BVN No.:
          </div>
          <div className="">{vendor.bvn || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Name:
          </div>
          <div className="">{vendor.bank_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Account Name:
          </div>
          <div className="">{vendor.bank_account_name || "..."}</div>
        </div>
        <div className="flex gap-2 py-2">
          <div className="font-alaba-mid min-w-[100px] w-[120px] truncate">
            Bank Account No.:
          </div>
          <div className="">{vendor.account_number || "..."}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-0">
        <Button
          label="Approve"
          icon={<Check size={15} />}
          className="bg-green-500 text-xs md:text-sm"
        />
        <Button
          label="Reject"
          icon={<X size={15} />}
          className="bg-red-500 text-xs md:text-sm"
        />
      </div>
    </div>
  );
};

export default VendorDetail;
