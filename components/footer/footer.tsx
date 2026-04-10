// Mengimpor komponen Link dari Next.js untuk membuat tautan navigasi internal (SPA routing)
import Link from "next/link"
// Mengimpor komponen Image dari Next.js untuk memuat gambar dengan fitur optimasi otomatis (namun tidak dipakai di file ini)
import Image from "next/image"

// Deklarasi dan eksport konstanta/komponen bernama Footer
export const Footer = () => {
    return (
        // Tag semantik <footer> HTML5, menggunakan class Tailwind 'bg-gray-900' memberikan latar belakang warna gelap (dark theme)
        <footer className='bg-gray-900'>

            {/* Wrapper utama (Container) untuk footer */}
            {/* 'max-w-7xl mx-auto px-4 w-full': membatasi lebar maksimal konten, memposisikannya di tengah layar, dan memberi jeda (padding) di sisi kiri-kanan */}
            {/* 'py-12 md:py-16': Menambahkan jarak vertikal atas-bawah; lebih renggang (py-16) saat dilihat di mode tablet/desktop */}
            <div className='max-w-7xl mx-auto px-4 w-full py-12 md:py-16'>

                {/* Sistem Grid untuk membagi konten footer menjadi beberapa kolom (Brand, Links, Form) */}
                {/* 'grid grid-cols-1 md:grid-cols-3': Secara default di HP (mobile) berbentuk 1 kolom memanjang ke bawah, namun di layar tablet/laptop (md) dibagi menjadi 3 kolom sejajar mendatar */}
                {/* 'gap-12 md:gap-8 lg:gap-12': Mengatur jarak ruang pernapasan (gap) antar setiap kolom */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12'>

                    {/* BAGIAN 1: Brand / Logo dan Deskripsi Singkat */}
                    <div>
                        {/* Judul logo website, membungkus Link agar saat logo diklik akan mengarah ke Homepage ("/") */}
                        <Link href="/" className="mb-6 block">
                            {/* Membentuk gaya teks logo 'Saint Hotel' dengan font custom "Neue", tracking-wider untuk merenggangkan huruf */}
                            {/* Ada efek hover:text-cyan-700 untuk memberikan transisi perubahan warna saat disorot kursor */}
                            <span className='font-Neue text-3xl md:text-3xl tracking-wider text-white hover:text-cyan-400 transition-colors duration-200'>
                                Saint <span className='text-cyan-400 hover:text-white transition-colors duration-200'>Hotel</span>
                            </span>
                        </Link>
                        {/* Paragraf untuk deskripsi singkat profil hotel dengan warna tulisan keabu-abuan (text-gray-400) dan jeda tinggi baris (leading-relaxed) */}
                        <p className="text-gray-400 leading-relaxed pr-0 md:pr-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ut tenetur quis fuga dolores nihil.
                        </p>
                    </div>

                    {/* BAGIAN 2: Direktori Tautan Tambahan (Links dan Legal) */}
                    {/* Menggunakan display 'flex' untuk membuat sub-kolom agar List 'Links' dan 'Legal' tersusun rapi berdekatan secara horizontal */}
                    <div className="flex gap-10 md:gap-12 lg:gap-20 justify-start md:justify-center">

                        {/* Sub-kolom Pertama: Menu Akses Cepat */}
                        <div className="flex-1 md:flex-none">
                            <h4 className="mb-6 text-lg font-semibold text-white">Links</h4>
                            {/* Tag UL dan LI untuk membuat daftar item (list). 'flex-col space-y-4' akan menyusun setiap tautan rapi dari atas ke bawah */}
                            <ul className="flex flex-col space-y-4 text-gray-400">
                                {/* Tautan menggunakan Next/Link yang mengarah pada rute aplikasi Anda */}
                                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                                <li><Link href="/room" className="hover:text-cyan-400 transition-colors">Room</Link></li>
                                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Sub-kolom Kedua: Kumpulan Tautan Kebijakan/Legalitas */}
                        <div className="flex-1 md:flex-none">
                            <h4 className="mb-6 text-lg font-semibold text-white">Legal</h4>
                            <ul className="flex flex-col space-y-4 text-gray-400">
                                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Legal</Link></li>
                                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Term & Condition</Link></li>
                                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Payment Method</Link></li>
                                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* BAGIAN 3: Form Berlangganan Newsletter / Newsletter Section */}
                    <div>
                        <h4 className="mb-6 text-lg font-semibold text-white">Newsletter</h4>
                        <p className="text-gray-400 mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>

                        {/* Form inputan agar user dapat mendaftarkan alamat email */}
                        {/* 'flex-col gap-3' akan menumpuk kotak input dan tombol submit ke bawah */}
                        <form action="" className="flex flex-col gap-3">
                            {/* Kotak Input (Input Field). Menggunakan properti style 'focus:ring-cyan-500' 
                                sehingga saat pengunjung mengklik inputnya untuk mengetik, ia akan berubah mengeluarkan garis cyan estetik. */}
                            <input
                                type="email"
                                name="email"
                                className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-500 border border-gray-700 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                placeholder="masukan@email.com"
                            />
                            {/* Tombol Aksi (Submit). Didesain memenuhi lebar form (w-full p-3) dengan warna cyan yang serasi */}
                            <button className="bg-cyan-400 p-3 font-semibold text-white w-full text-center rounded-md hover:bg-cyan-500 transition-colors duration-200">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* BAGIAN 4: Hak Cipta / Copyright Section (Garis paling bawah) */}
            {/* 'border-t border-gray-800' memberikan pemisah garis atas yang tipis dan pudar agar desain Footer tertata rapi */}
            {/* Konten teks akan otomatis rata-tengah (text-center) */}
            <div className='max-w-7xl mx-auto px-4 py-8 text-center text-sm md:text-base text-gray-500 border-t border-gray-800'>
                &copy; Copyright 2026 | alfathaannn | All Right Reserved
            </div>
        </footer>
    )
}
