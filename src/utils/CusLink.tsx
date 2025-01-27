'use client'
import { FC, ReactNode, memo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface CusLinkProps {
  href?: string
  activeLinkClasses: string
  className: string
  children: ReactNode
  normalClasses: string
  target?: boolean
}

const CusLinkComponent: FC<CusLinkProps> = ({
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
    <Link
      href={href ?? ""}
      className={`${className} ${classes}`}
      target={target ? '_parent' : '_self'}
      prefetch={true}
    >
      {children}
    </Link>
  )
}

export const CusLink = memo(CusLinkComponent);

export const Shortanylistbytime = (list: any[] = [], key = "") => {
  if (!Array.isArray(list) || !key) return [];
  return [...list].sort((a, b) => {
    const dateA = new Date(a?.[key]);
    const dateB = new Date(b?.[key]);
    return dateB.getTime() - dateA.getTime();
  });
}