"use client"

import { usePathname } from 'next/dist/client/components/navigation'
import React from 'react'
import SiteHeader from './SiteHeader';

const Appshell = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();
    const isFullscreenRoute = pathname?.startsWith("/workspace") || 
    pathname?.startsWith("/shared");

    if (isFullscreenRoute) {
        return <>{children}</>
    }

  return (
    <>
        <SiteHeader/>
        <div  className="flex flex-1 flex-col pt-18">{children}</div>
    </>
  );
}

export default Appshell