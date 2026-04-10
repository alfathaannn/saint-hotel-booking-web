import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import heroImage from '@/public/hero-image.png'

const Hero = () => {
    return (
        <div className='relative h-screen to-white overflow-hidden'>
            <div className='absolute inset-0'>
                <Image
                    src={heroImage}
                    alt="Hero"
                    fill
                    className='object-cover object-center w-full h-full'
                />
                <div className="absolute inset-0 bg-gray-900/60"></div>
            </div>
            <section className="relative flex flex-col items-center justify-center h-full text-center">
                <div className="text-cyan-50">
                    <h1
                        className="font-extrabold leading-tight text-5xl md:text-8xl font-Neue tracking-wider"
                    >
                        A SYMPHONY OF{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-50 to-cyan-400">
                            ELEGANCE
                        </span>
                    </h1>
                    <p className="text-white text-xl md:text-2xl">A curated sanctuary for the discerning few. Experience Jakarta most exclusive address.</p>
                    <div className='flex justify-center pt-6 gap-5'>
                        <Link
                            href="/room"
                            className="w-50 px-6 py-3 bg-cyan-500/20 backdrop-blur-md text-white rounded-xl hover:bg-cyan-500/30 transition-all duration-300 hover:border-cyan-300/60 hover:scale-105"
                        >
                            Reserve Your Suite
                        </Link>

                        <Link
                            href="/contact"
                            className="w-50 px-6 py-3 bg-cyan-500/20 backdrop-blur-md text-white rounded-xl hover:bg-cyan-500/30 transition-all duration-300 hover:border-cyan-300/60 hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero