"use client"

import React, { useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import { formatCurrency, formatDate } from '@/lib/utils'

type ReservationData = {
    id: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    price: number;
    User: {
        name: string | null;
        email: string;
    };
    Room: {
        name: string;
    };
    payment: {
        status: string;
        amount: number;
        method: string | null;
    } | null;
}

const columnHelper = createColumnHelper<ReservationData>()

const columns = [
    columnHelper.accessor(row => row.User.name, {
        id: 'customerName',
        header: 'Customer Name',
        cell: info => (
            <div>
                <div className="font-semibold text-gray-800">{info.getValue() || "Unknown"}</div>
                <div className="text-xs text-gray-500 font-mono">#{info.row.original.id.slice(0, 8)}</div>
            </div>
        ),
    }),
    columnHelper.accessor(row => row.Room.name, {
        id: 'roomName',
        header: 'Room',
        cell: info => <span className="font-medium text-gray-700">{info.getValue()}</span>,
    }),
    columnHelper.accessor('startDate', {
        header: 'Dates',
        cell: info => (
            <div className="text-sm">
                <div className="font-medium text-gray-700">{formatDate(info.getValue().toISOString())}</div>
                <div className="text-xs text-gray-500">to {formatDate(info.row.original.endDate.toISOString())}</div>
            </div>
        ),
    }),
    columnHelper.accessor(row => row.payment?.amount, {
        id: 'amount',
        header: 'Total Price',
        cell: info => <span className="font-semibold text-cyan-600">{info.getValue() ? formatCurrency(info.getValue() as number) : "-"}</span>,
    }),
    columnHelper.accessor('createdAt', {
        header: 'Order Date',
        cell: info => <span className="text-sm text-gray-600">{formatDate(info.getValue().toISOString())}</span>,
    }),
    columnHelper.accessor(row => row.payment?.status, {
        id: 'status',
        header: 'Status',
        cell: info => {
            const status = info.getValue() || 'UNKNOWN'
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${status === 'paid' ? 'bg-green-100 text-green-700' :
                        status === 'failed' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                    }`}>
                    {status}
                </span>
            )
        },
    }),
]

export const ReservationTable = ({ data }: { data: ReservationData[] }) => {
    const [globalFilter, setGlobalFilter] = useState('')

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-cyan-400 overflow-hidden mt-6 mb-6">
            {/* Header / Table Controls */}
            <div className="p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Reservations Data
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Manage and monitor all booking transactions</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        {/* Global Search */}
                        <div className="relative flex-1 sm:flex-none">
                            <input
                                type="text"
                                value={globalFilter ?? ''}
                                onChange={e => setGlobalFilter(e.target.value)}
                                placeholder="Search data's..."
                                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white p-2"
                            />
                        </div>

                        {/* Rows per page select */}
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table wrapper for Horizontal and Vertical scroll */}
            <div className="overflow-x-auto overflow-y-auto w-full relative" style={{ maxHeight: '550px' }}>
                <table className="w-full text-center border-collapse min-w-[800px] md:min-w-full">
                    <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b border-gray-200">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-50 bg-white">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-linear-to-r hover:from-cyan-50/50 hover:to-transparent transition-all duration-200 group">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="text-gray-500 text-sm font-medium">No reservations found matching your criteria.</p>
                                        <p className="text-gray-400 text-xs">Try adjusting your search or filter</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>
                            Page <strong className="text-gray-800">{table.getState().pagination.pageIndex + 1}</strong> of{' '}
                            <strong className="text-gray-800">{table.getPageCount()}</strong>
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 border-2 border-gray-200 hover:border-cyan-400 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            ← Previous
                        </button>
                        <button
                            className="px-4 py-2 border-2 border-gray-200 hover:border-cyan-400 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    )
}
