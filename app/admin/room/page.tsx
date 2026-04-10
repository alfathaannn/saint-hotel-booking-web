import React from 'react'
import RoomTable from '@/components/admin/room/room-table'
import Link from 'next/link'
import { Suspense } from 'react'

const ManageRoomPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 mt-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Rooms</h1>
          <p className="text-gray-500 mt-1">Manage your hotel rooms inventory</p>
        </div>
        <Link 
          href="/admin/room/create" 
          className="px-6 py-2.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Room
        </Link>
      </div>
      <Suspense fallback={<RoomListSkeleton />}>
        <RoomTable />
      </Suspense>
    </div>
  )
}

const RoomListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-5 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    ))}
  </div>
)

export default ManageRoomPage