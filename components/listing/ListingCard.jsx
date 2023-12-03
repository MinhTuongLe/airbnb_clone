"use client";

import useCountries from "@/hook/useCountries";

import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";
import { FaStar } from "react-icons/fa";

function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  shrink = false,
}) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const { getByValue } = useCountries();
  const pathName = usePathname();
  const router = useRouter();

  const location = getByValue(data.country);

  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price_per_night = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price_per_night;
  }, [reservation, data.price_per_night]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      onClick={() => {
        if (pathName === "/properties") {
          router.push(`/properties/${data.id}`);
        } else window.open(`/listings/${data.id}`, "_blank");
      }}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative oerflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover aspect-square h-full w-full group-hover:scale-110 transition  rounded-xl"
            src={data.cover || emptyImageSrc}
            alt="listing"
            priority
          />
          {/* {shrink === false && (
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )} */}
          {shrink === false && (
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} />
            </div>
          )}
        </div>
        {shrink === false && (
          <div className="font-semibold text-lg text-ellipsis line-clamp-1">
            {data.address || ""} {data.country ? `, ${data.country}` : ""}
          </div>
        )}
        <div className="flex justify-between items-center space-x-4">
          <div className="font-light text-neutral-500 text-ellipsis line-clamp-1">
            {/* {reservationDate || data.category} */}
            {data.city || ""} {data.state ? `, ${data.state}` : ""}
          </div>
          <div className="flex space-x-2 justify-between items-center">
            <FaStar size={16} />
            <span className="text-sm">5.0</span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex gap-1 font-semibold">
            ${price_per_night}{" "}
            {!reservation && <div className="font-light"> / Night</div>}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </motion.div>
  );
}

export default ListingCard;
