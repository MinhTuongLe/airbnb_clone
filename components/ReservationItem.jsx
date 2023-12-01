"use client";

import useCountries from "@/hook/useCountries";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";

function ReservationItem({ onDelete }) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="col-span-1 group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-md">Booking ID: 123123123</span>
          <MdDeleteOutline
            className="text-[20px] text-rose-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover aspect-square h-full w-full rounded-xl"
            src={emptyImageSrc}
            alt="listing"
            priority
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-lg text-ellipsis line-clamp-1">
            Paradise
          </div>
          <div className="flex gap-1 font-semibold">$9999</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="gap-1 font-semibold bg-[#05a569] text-white rounded-2xl w-[120px] h-[32px] flex items-center justify-center">
            Successfully
          </div>
          {/* <div className="gap-1 font-semibold bg-rose-500 text-white rounded-2xl w-[120px] h-[32px] flex items-center justify-center">
        Failed
      </div> */}
          <span
            className="text-rose-500 font-semibold text-md cursor-pointer hover:text-rose-700"
            onClick={() => router.push(`/reservations/41`)}
          >
            See details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ReservationItem;
