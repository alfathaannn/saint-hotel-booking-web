// Menandakan bahwa komponen ini dirender di sisi client broswer (Client Component), 
// ini wajib ada karena kita menggunakan state (useState) dan interaksi tombol (onClick).
"use client";

// Mengimpor ikon hamburger (IoMenu) dan ikon silang/tutup (IoClose) dari library 'react-icons/io5'.
import { IoMenu, IoClose } from "react-icons/io5";

// Mengimpor hook useState dari React untuk mengelola state lokal.
import { useState } from "react";

// Mengimpor utility clsx untuk menggabungkan class CSS Tailwind secara kondisional dengan mudah.
import { clsx } from "clsx";

// Mengimpor komponen Link dari Next.js untuk navigasi antar halaman tanpa me-reload halaman secara penuh (SPA behavior).
import Link from "next/link";

import Image from 'next/image'

import { useSession, signOut } from "next-auth/react";


const NavLink = () => {
    // State 'open' digunakan untuk melacak apakah menu navigasi mobile sedang terbuka (true) atau tertutup (false).
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();


    // Fungsi pembantu untuk menutup menu mobile. Biasanya dipanggil otomatis setelah pengguna mengklik salah satu link navigasi.
    const closeMenu = () => setOpen(false);

    return (
        <>
            {/* Tombol Hamburger/Close untuk mode Mobile (HP) */}
            {/* Class 'md:hidden' berarti tombol ini HANYA akan muncul di layar kecil (HP) dan disembunyikan di layar laptop/tablet besar */}
            <button
                aria-label="Toggle Menu"
                onClick={() => setOpen(!open)} // Saat diklik, state 'open' akan dibalik kebalikan nilai saat ini (true -> false, maupun sebaliknya)
                className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 transition-colors duration-100">
                {/* Menampilkan ikon hamburger jika state open = false, dan ikon silang (close) jika open = true */}
                {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
            </button>

            {/* Container luar untuk kumpulan List Navigasi (Menu Items) */}
            {/* clsx sangat berguna di sini untuk menambahkan class logika secara dinamis */}
            <div className={clsx("w-full md:block md:w-auto", {
                // Class 'hidden' akan diterapkan SEMUA waktu jika menu tertutup (!open) TAPI tidak berpengaruh pada mode desktop
                "hidden": !open,
                // Block class di bawah ini mengatur tampilan DROPDOWN MENU agar melayang saat di mode mobile (absolute positioning, diatur bg-white/95 agak transparan dengan efek blur),
                // sekaligus menonaktifkan tampilan dropdown itu dan mengubahnya menjadi susunan sejajar (flex) biasa saat di layar medium/kepinggiran desktop (md:static md:bg-transparent, dsb).
                "absolute top-full left-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 md:static md:bg-transparent md:shadow-none md:border-none md:flex md:items-center": true
            })}>
                {/* UL ini adalah list untuk item menu. Secara default arah susunannya menuruk ke bawah (flex-col) untuk layar HP, */}
                {/* dan berubah menjadi menyamping horizontal (md:flex-row) dengan jarak antar item (md:space-x-8) untuk layar besar. */}
                <ul className="flex flex-col font-medium text-sm uppercase p-4 gap-1 md:gap-0 md:flex-row md:items-center md:space-x-8 md:p-0">

                    {/* Item Navigasi 1: Home */}
                    <li>
                        <Link
                            href="/"
                            onClick={closeMenu} // Ketika link "Home" diklik, tutup dropdown mobile otomatis
                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                            Home
                        </Link>
                    </li>

                    {/* Item Navigasi 2: About */}
                    <li>
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                            About
                        </Link>
                    </li>

                    {/* Item Navigasi 3: Room */}
                    <li>
                        <Link
                            href="/room"
                            onClick={closeMenu}
                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                            Room
                        </Link>
                    </li>

                    {/* Item Navigasi 4: Contact */}
                    <li>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                            Contact
                        </Link>
                    </li>

                    {session && (
                        <>
                            {/* Item Navigasi Khusus User: My Reservation */}
                            <li>
                                <Link
                                    href="/myreservation"
                                    onClick={closeMenu}
                                    className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                                    My Reservation
                                </Link>
                            </li>
                            {session.user.role === "admin" && (
                                <>
                                    {/* Item Navigasi Khusus Admin: Dashboard */}
                                    <li>
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={closeMenu}
                                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                                            Dashboard
                                        </Link>
                                    </li>

                                    {/* Item Navigasi Khusus Admin: Manage Room */}
                                    <li>
                                        <Link
                                            href="/admin/room"
                                            onClick={closeMenu}
                                            className="block py-3 px-4 text-gray-700 hover:text-cyan-400 hover:bg-gray-100 rounded-md md:hover:bg-transparent md:p-0 transition-colors duration-100">
                                            Manage Room
                                        </Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                    {session ? (
                        <li className="pt-4 pb-2 md:pt-0 md:pb-0 md:px-0 md:hidden">
                            <button
                                onClick={() => signOut()}
                                // Menggunakan desain kotak background warna (bg-cyan-800) dan teks warna putih.
                                // Di mode mobile lebarnya full (w-full) menyerupai tombol block, di laptop lebarnya otomatis seukuran konten (md:w-auto)
                                className="px-6 py-3 font-bold tracking-wider bg-red-500/20 backdrop-blur-md text-red-600 rounded-xl hover:bg-red-500/30 transition-all duration-300 hover:border-cyan-300/60 cursor-pointer">
                                Sign Out
                            </button>
                        </li>
                    ) : (
                        <li className="pt-4 pb-2 md:pt-0 md:pb-0 md:px-0">
                            <Link
                                href="/signin"
                                onClick={closeMenu}
                                // Menggunakan desain kotak background warna (bg-cyan-800) dan teks warna putih.
                                // Di mode mobile lebarnya full (w-full) menyerupai tombol block, di laptop lebarnya otomatis seukuran konten (md:w-auto)
                                className="px-6 py-3 font-bold tracking-wider bg-cyan-500/20 backdrop-blur-md text-cyan-600 rounded-xl hover:bg-cyan-500/30 transition-all duration-300 hover:border-cyan-300/60 cursor-pointer">
                                Sign In
                            </Link>
                        </li>
                    )}
                    {session?.user ? (
                        <div className="flex items-center justify-end md:order-2">
                            <div className="relative group hidden md:block">
                                {/* Profile Dropdown Card */}
                                <div className="flex items-center space-x-3 bg-linear-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 rounded-xl py-1 pl-1 pr-4 shadow-sm hover:shadow-md transition-all duration-300">
                                    {/* Avatar dengan efek glow */}
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-900 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden transform group-hover:scale-105 transition duration-300">
                                            <Image
                                                src={session.user.image || "/avatar-image.png"}
                                                width={40}
                                                height={40}
                                                alt="avatar"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    {/* User Info & Sign Out - Muncul saat hover */}
                                    <div className="flex items-center space-x-3">
                                        {/* Sign Out Button */}
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center tracking-wider space-x-1 py-1.5 px-3 bg-linear-to-r from-red-500 to-red-600 text-white text-xs rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 hover:shadow transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"
                                        >
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </ul>
            </div>
        </>
    )
}

// Mengekspor komponen NavLink agar bisa diimpor dan digunakan di file tempat lain (contohnya di komponen Navbar utama)
export default NavLink