"use client";

import useCountries from "@/hook/useCountries";

import { motion } from "framer-motion";
import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { AiOutlineShareAlt } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { BASE_URL } from "../../const";

function ListingHead({ title, locationValue, imageSrc, id, currentUser }) {
  const { getByValue } = useCountries();
  const currentUrl = usePathname();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(BASE_URL + currentUrl);
  };

  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <Heading
          title={title}
          subtitle={`${
            locationValue?.address ? locationValue?.address + ", " : ""
          } ${locationValue.city}, ${locationValue.country}`}
        />
        <div className="flex justify-between items-end gap-6">
          <div
            className="flex items-center justify-between cursor-pointer hover:text-rose-500"
            onClick={handleCopyToClipboard}
          >
            <AiOutlineShareAlt />
            <span className="text-[16px] ml-4">Share</span>
          </div>
          <div className="">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="col-span-6 w-full h-[60vh] overflow-hidden rounded-xl relative"
        >
          <Image
            src={imageSrc}
            alt="image"
            fill
            className="object-cover w-full"
          />
          <div className="row-span-1">
            <div className="grid grid-cols-12 gap-8 w-full h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
              >
                <Image
                  src={imageSrc}
                  alt="image"
                  fill
                  className="object-cover w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
              >
                <Image
                  src={imageSrc}
                  alt="image"
                  fill
                  className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                  <HeartButton listingId={id} currentUser={currentUser} />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-12 gap-8 w-full h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
              >
                <Image
                  src={imageSrc}
                  alt="image"
                  fill
                  className="object-cover w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
              >
                <Image
                  src={imageSrc}
                  alt="image"
                  fill
                  className="object-cover w-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className="col-span-6 h-[60vh]">
          <div className="grid grid-rows-2 h-[60vh] gap-4">
            <div className="row-span-1">
              <div className="grid grid-cols-12 gap-4 w-full h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
                >
                  <Image
                    src={imageSrc}
                    alt="image"
                    fill
                    className="object-cover w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
                >
                  <Image
                    src={imageSrc}
                    alt="image"
                    fill
                    className="object-cover w-full"
                  />
                </motion.div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="grid grid-cols-12 gap-4 w-full h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
                >
                  <Image
                    src={imageSrc}
                    alt="image"
                    fill
                    className="object-cover w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="col-span-6 w-full h-full overflow-hidden rounded-xl relative"
                >
                  <Image
                    src={imageSrc}
                    alt="image"
                    fill
                    className="object-cover w-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingHead;
