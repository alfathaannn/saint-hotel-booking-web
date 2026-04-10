import React from 'react'
import Image from 'next/image'
import headerSectionImage from '@/public/heading-section-image.jpg'

const HeaderSection = ({
    title, subtitle
}: 
{
    title: string,
    subtitle: string
}) => {
  return (
    <header className='relative h-60 text-center overflow-hidden'>
        <div className='absolute inset-0'>
            <Image
                src={headerSectionImage}
                alt="Hero"
                fill
                className='object-cover object-center w-full h-full transition-transform duration-500'
            />
            <div className="absolute inset-0 bg-linear-to-b from-cyan-900/50 via-cyan-900/50 to-cyan-900/50"></div>
            {/* <div className="absolute inset-0 bg-black/50 opacity-50"></div> */}
        </div>
        <div className="relative flex flex-col justify-center items-center pt-14 h-60 text-center">
            <h1 className='text-4xl text-white font-bold leading-tight tracking-tight capitalize tracking-wider'>{title}</h1>
            <p className='text-white text-xl md:text-2xl leading-tight tracking-tight capitalize'>{subtitle}</p>
        </div>
    </header>
  )
}

export default HeaderSection