import Image from 'next/image'
import Link from 'next/link'
// import Navlink from './navlink'
import Navlink from '@/components/header/navbar/navlink'

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full bg-white/100 backdrop-blur-md border-b border-gray-200/50 z-20'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        {/* <Image src="/logo.png" alt="Logo" width={128} height={49} /> */}
                        <span className='font-Neue text-3xl md:text-3xl tracking-wider text-gray-900 hover:text-cyan-400 transition-colors duration-200'>
                            Saint <span className='text-cyan-400 hover:text-gray-900 transition-colors duration-200'>Hotel</span>
                        </span>
                    </Link>
                    <Navlink />
                </div>
            </div>
        </nav>
    )
}

export default Navbar