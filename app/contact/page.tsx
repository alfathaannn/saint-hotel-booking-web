import React from 'react'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import { ContactForm } from '@/components/form/contact-form'

import { Metadata } from 'next'
import HeaderSection from '@/components/header/header-section/header-section'
export const metadata: Metadata = {
    title: "Contact Saint Hotel",
    description: "Contact Us",
}

const ContactPage = () => {
    return (
        <div>
            <HeaderSection
                title="Contact Saint Hotel"
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <div className="max-w-screen-xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-lg text-gray-500 mb-3">Contact Us</h1>
                        <h1 className="text-5xl font-semibold text-gray-900 mb-4">Get in touch</h1>
                        <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        <ul className="list-items space-y-6 pt-8">
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 rounded-sm">
                                    <IoMailOutline className="size-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold">Email</h4>
                                    <p className="text-gray-500">contact@bookinghotel.com</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 rounded-sm">
                                    <IoCallOutline className="size-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold">Phone</h4>
                                    <p className="text-gray-500">+62 812 3456 7890</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 rounded-sm">
                                    <IoLocationOutline className="size-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold">Address</h4>
                                    <p className="text-gray-500">123 Kampung Cikawe, Jakarta Selatan, Indonesia</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactPage