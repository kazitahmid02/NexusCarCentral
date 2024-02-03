import React from 'react'
import Link from 'next/link' ;
import Image from 'next/image';
import CustomButton from './CustomButton'

const NavBar = () => (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src='/logo-no-background.png'
          alt='logo'
          width={145}
          height={18}
          className='object-contain'
        />
      </Link>

      <CustomButton
        title='Sign in'
        btnType='button'
        containerStyles='text-white rounded-full bg-black min-w-[130px]'
      />
    </nav>
  </header>
);

export default NavBar;