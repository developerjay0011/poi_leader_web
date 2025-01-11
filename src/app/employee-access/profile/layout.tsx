'use client'
import { ReactNode, FC } from 'react'

const AdminProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <section className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
        <section className='w-full relative'>{children}</section>
      </section>
    </>
  )
}

export default AdminProfileLayout
