'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link} from "react-router-dom"
const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      
      <header className="absolute inset-x-0 top-0 z-50 w-full shadow-md">
        <nav className="flex items-center justify-between p-4 md:p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center flex-1">
            <a href="#" className="p-2">
              <span className="sr-only">Your Company</span>
              <img
                src="https://icladdis.com/images/ICL-LOGO-NEW.png"
                alt="Company Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-end">
          <Link to="/signin" className="mt-4 block px-4 py-2 rounded-md text-lg font-medium text-indigo-600 hover:bg-gray-100">
  Sign In
</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 w-5/6 max-w-sm bg-white p-6 shadow-xl sm:w-full">
          <div className="flex items-center justify-between">
            <a href="#" className="p-4">
              <span className="sr-only">Your Company</span>
              <img
                src="https://icladdis.com/images/ICL-LOGO-NEW.png"
                alt="Company Logo"
                className="h-8 w-auto"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 rounded-md text-lg font-medium text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </a>
            ))}
            {/* <a href="/signin" className="mt-4 block px-4 py-2 rounded-md text-lg font-medium text-indigo-600 hover:bg-gray-100">
              Log in
            </a> */}
            <Link to="/signin" className="mt-4 block px-4 py-2 rounded-md text-lg font-medium text-indigo-600 hover:bg-gray-100">
  Sign In
</Link>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}
