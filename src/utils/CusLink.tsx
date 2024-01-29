'use client'
import { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface CusLinkProps {
  href: string
  activeLinkClasses: string
  className: string
  children: ReactNode
  normalClasses: string
  target?: boolean
}

export const CusLink: FC<CusLinkProps> = ({
  href,
  activeLinkClasses,
  children,
  className,
  normalClasses,
  target,
}) => {
  const curActiveRoute = usePathname()
  const classes = curActiveRoute === href ? activeLinkClasses : normalClasses
  return (
    <>
      <Link
        href={href}
        className={`${className} ${classes}`}
        target={target ? '_parent' : '_self'}>
        {children}
      </Link>
    </>
  )
}
