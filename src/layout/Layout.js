import { cn } from '@/Utilities/cn';
import HeaderRightSection from '@/modules/HeaderRightSection';
import Navbar from '@/modules/Navbar';
import ProfileModal from '@/modules/ProfileModal';
import SocialFooter from '@/modules/SocialFooter';
import { getUserDetail } from '@/services/APIs/helper';
import { getUser } from '@/services/firebase-services/cookies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotificationBell from '@/modules/NotificationBell';

export default function Layout({ children, className, role }) {
  return (
    <>
      <div className={cn('wrapper flex flex-wrap items-start', className)}>
        <Navbar role={role} />
        <div className='w-full flex flex-wrap items-start h-full relative bg-gray-100'>
          {/* ✅ Notification Bell Top Right */}
          <div className='w-full flex justify-end items-center px-8 pt-4'>
            <NotificationBell role={role} />
          </div>

          {/* ✅ Page Content */}
          <div className='w-full mt-4 px-8'>
            {children}
            <SocialFooter />
          </div>
        </div>
      </div>
    </>
  );
}
