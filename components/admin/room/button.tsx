"use client";

import { deleteRoom, updateRoom } from '@/lib/action'
import { IoTrashBinOutline, IoPencilOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'
import Link from 'next/link'

export const DeleteButton = ({ id, image }: { id: string, image: string }) => {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteRoom(id, image);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your room has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <button type="button" onClick={handleDelete} className="flex-1 px-4 py-2 text-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <IoTrashBinOutline className='size-4' />
            Delete
        </button>
    )
}