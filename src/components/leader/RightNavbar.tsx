import { FC } from 'react'

interface RightNavbarProps { }
export const RightNavbar: FC<RightNavbarProps> = () => {
  return (
    <>
      <section className='py-8 px-3 bg-white flex flex-col shadow_left gap-5 h-full max-[1000px]:hidden'>
        <div className='rounded-full w-12 aspect-square flex items-center justify-center text-2xl relative '></div>
      </section>
    </>
  )
}
