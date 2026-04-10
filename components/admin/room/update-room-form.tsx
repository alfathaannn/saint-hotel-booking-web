"use client"
import React, { useActionState } from 'react'
import { updateRoom } from '@/lib/action'
import { useRef, useState } from 'react'
import { IoCloudUploadOutline, IoCheckmarkCircleOutline, IoTrashOutline } from "react-icons/io5"
import { Amenities, Room } from '@/app/generated/prisma/client'
import { RoomProps } from '@/types/room'
import {clsx} from "clsx";

const UpdateRoomForm = ({ amenities, room }: { amenities: Amenities[], room: RoomProps }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(room.image);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleDeleteImage = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!image) return;
        setIsUploading(true);
        setMessage("");

        try {
            const response = await fetch("/api/upload", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: image }),
            });
            if (response.ok) {
                setImage("");
                setMessage("Image removed");
                if (inputFileRef.current) inputFileRef.current.value = "";
            } else {
                setMessage("Failed to remove image");
            }
        } catch (error) {
            console.log(error);
            setMessage("Error removing image");
        } finally {
            setIsUploading(false);
        }
    }

    const handleImageUpload = async () => {
        if (!inputFileRef.current?.files) return null;
        const file = inputFileRef.current.files[0];
        const formData = new FormData();
        formData.set("file", file);
        setIsUploading(true);
        setMessage("");

        try {
            if (image) {
                await fetch("/api/upload", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: image }),
                });
            }

            const response = await fetch("/api/upload", {
                method: "PUT",
                body: formData,
            });
            const data = await response.json();
            if (response.status !== 200) {
                setMessage(data.message);
            } else {
                setImage(data.url);
                setMessage("Image uploaded successfully");
            }
        } catch (error) {
            console.log(error);
            setMessage("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    }

    const [state, formAction, isPending] = useActionState(updateRoom.bind(null, room.id, image), null);
    const checkedAmenities = room?.roomAmenities.map((item) => item.Amenities.id);

    return (
        <form action={formAction} className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Room Name & Description Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 from-gray-50 to-white px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Room Information</h2>
                            <p className="text-sm text-gray-500 mt-1">Basic details about room</p>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={room?.name}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                                    placeholder="e.g., Name Room"
                                    required
                                />
                                <div aria-live="polite" aria-atomic="true" className="mt-1">
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        {state?.errors?.name?.[0]}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    defaultValue={room?.description}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none"
                                    placeholder="Describe room, including features, views, and special amenities..."
                                    required
                                />
                                <div aria-live="polite" aria-atomic="true" className="mt-1">
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        {state?.errors?.description?.[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Amenities & Features</h2>
                            <p className="text-sm text-gray-500 mt-1">Select what room offers</p>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {amenities.map((item) => (
                                    <label key={item.id} className="flex items-center space-x-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={item.id}
                                            defaultChecked={checkedAmenities.includes(item.id)}
                                            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-cyan-600 transition-colors duration-200">
                                            {item.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <div aria-live="polite" aria-atomic="true" className="mt-3">
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    {state?.errors?.amenities?.[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Pricing */}
                <div className="space-y-6">
                    {/* Image Upload Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Room Image</h2>
                            <p className="text-sm text-gray-500 mt-1">Upload a photo of room</p>
                        </div>
                        <div className="p-6">
                            <label htmlFor="input-file" className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200 group relative overflow-hidden">
                                {isUploading ? (
                                    <div className="flex flex-col items-center justify-center p-6 text-center z-10">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="animate-spin h-6 w-6 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Uploading...</p>
                                    </div>
                                ) : image ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={image} alt="Uploaded Room" className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                                <IoCloudUploadOutline className="size-5" />
                                                Change Image
                                            </span>
                                            <button 
                                                onClick={handleDeleteImage}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors absolute top-4 right-4 shadow-sm"
                                            >
                                                <IoTrashOutline className="size-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-6 text-center z-10">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-cyan-100 transition-colors duration-200">
                                            <IoCloudUploadOutline className="size-6 text-gray-500 group-hover:text-cyan-600" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Click to upload</p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={inputFileRef}
                                    onChange={handleImageUpload}
                                    name="image"
                                    id="input-file"
                                    className="hidden"
                                    accept="image/*"
                                    disabled={isUploading}
                                />
                            </label>
                            {message && (
                                <div aria-live="polite" aria-atomic="true" className="mt-3 text-center">
                                    <p className={`text-sm font-medium ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
                                        {message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing & Capacity Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Pricing & Capacity</h2>
                            <p className="text-sm text-gray-500 mt-1">Set room details</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        Capacity
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="capacity"
                                    defaultValue={room?.capacity}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                                    placeholder="Number of guests"
                                />
                                <div aria-live="polite" aria-atomic="true" className="mt-1">
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        {state?.errors?.capacity?.[0]}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        Price per night
                                    </span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={room?.price}
                                        className="w-full pl-12 pr-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                                        placeholder="0"
                                    />
                                </div>
                                <div aria-live="polite" aria-atomic="true" className="mt-1">
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        {state?.errors?.price?.[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {/* General Error Message */}
                    {state?.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm">{state.error}</p>
                        </div>
                    ) : null}
                    <button
                        type="submit"
                        disabled={isPending}
                        className={clsx("w-full py-3 px-4 rounded-lg hover:bg-cyan-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]", isPending ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 text-white")}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <IoCheckmarkCircleOutline className="size-5" />
                            {isPending ? "Updating..." : "Update Room"}
                        </span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UpdateRoomForm