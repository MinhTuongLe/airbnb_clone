/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import Input from "@/components/inputs/Input";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import "../../../styles/globals.css";
import { API_URL } from "@/const";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

function PropertyClient({ place }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price_per_night: place?.price_per_night,
      name: place?.name,
      description: place?.description,
      capacity: place?.capacity,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      country: place?.country,
      state: place?.city,
      city: place?.city,
    },
  });

  const location = watch("location");
  // const lat = place?.lat;
  // const lng = place?.lng;
  const [lat, setLat] = useState(place?.lat);
  const [lng, setLng] = useState(place?.lng);
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../../../components/Map"), {
        ssr: false,
      }),
    [lat, lng]
  );

  const [searchResult, setSearchResult] = useState(null);
  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  function processSearchResult(searchResult) {
    const numberRegex = /^[0-9]+$/;
    const array = searchResult.split(", ");
    let country = "";
    let city = "";
    let address = "";

    if (array) {
      const length = array.length;
      country = array[length - 1];
      city = numberRegex.test(array[length - 2])
        ? array[length - 3]
        : array[length - 2];
      const temp = numberRegex.test(array[length - 2])
        ? array.slice(0, length - 3)
        : array.slice(0, length - 2);
      address = temp && temp.length > 1 ? temp.join(", ") : temp.join("");
    }
    return { country, city, address };
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    const { country, city, address } = processSearchResult(searchResult?.label);

    const submitValues = {
      name: data?.name || "",
      description: data?.description || "",
      price_per_night: Number(data?.price_per_night) || 0,
      address: address || place.address,
      capacity: data?.capacity || 1,
      lat: searchResult.x || place.lat,
      lng: searchResult.y || place.lng,
      country: country || place.country,
      state: city || place.city,
      city: city || place.city,
    };

    // console.log(submitValues);
    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        place_id: place.id,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .put(`${API_URL}/places`, submitValues, config)
      .then(() => {
        setIsLoading(false);
        toast.success("Update Room Successfully");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Update Room Failed");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchResult) {
      setLat(searchResult.x);
      setLng(searchResult.y);
    }
  }, [searchResult]);

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <h1 className="text-2xl font-bold my-3">Property Information</h1>
          <div className="px-8 pb-8 space-y-6">
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="capacity"
              label="Capacity"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="price_per_night"
              label="Price per Night"
              formatPrice
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className="w-full relative">
              <input
                value={
                  searchResult
                    ? searchResult.label
                    : `${place?.address ? place?.address + ", " : ""} ${
                        place?.city ? place?.city + ", " : ""
                      } ${place?.country || "-"}`
                }
                id="_location"
                readOnly={true}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition opacity-70 cursor-not-allowed border-neutral-300 focus:outline-none`}
              />

              <label
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 text-zinc-400`}
              >
                Location
              </label>
            </div>
            <Map center={[lat, lng]} onSearchResult={handleSearchResult} />
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-6">
                <Button
                  outline
                  label="Cancel"
                  onClick={() => {
                    reset();
                    router.push("/properties");
                  }}
                />
              </div>
              <div className="col-span-6">
                <Button
                  disabled={isLoading}
                  label="Update"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyClient;
