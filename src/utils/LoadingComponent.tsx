import { FC } from 'react'
import { GenerateId } from './utility'

interface LoadingComponentProps {
  rows: number
  columns: number
}
export const LoadingComponent: FC<LoadingComponentProps> = ({
  rows,
  columns,
}) => {
  const TableRow = () => (
    <div className='flex gap-1 w-full'>
      {Array.from({ length: columns }, () => {
        const key = GenerateId()
        return (
          <div
            key={key}
            className='w-full h-10 bg-gray-300 bg-opacity-80 animate-pulse'
          />
        )
      })}
    </div>
  )

  return (
    <>
      <section className='w-full h-max p-8'>
        <div className='w-full h-full bg-gray-200 rounded-md animate-pulse border border-gray-300 p-8'>
          <div className='w-96 h-16 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />

          <section className='flex justify-between mt-20 items-end'>
            <div className='flex flex-col gap-3'>
              <div className='w-16 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />

              <article className='flex gap-2'>
                <div className='w-20 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />
                <div className='w-14 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />

                <div className='w-24 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse ml-1' />
                <div className='w-14 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />
              </article>
            </div>

            <article className='flex flex-col gap-3 items-end'>
              <div className='w-28 h-10 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />
              <div className='w-48 h-9 rounded-md bg-gray-300 bg-opacity-80 animate-pulse' />
            </article>
          </section>

          <section className='flex flex-col gap-1 mt-10'>
            {Array.from({ length: rows }, () => {
              const key = GenerateId()
              return <TableRow key={key} />
            })}
          </section>

          <div className='flex justify-between mt-14 items-end'>
            <div className='w-56 h-8 rounded-md bg-gray-300 bg-opacity-80 animate-pulse'></div>

            <section className='rounded-md overflow-hidden flex gap-1'>
              <div className='w-10 h-10 bg-gray-300 bg-opacity-80 animate-pulse'></div>
              <div className='w-12 h-10 bg-gray-300 bg-opacity-80 animate-pulse'></div>
              <div className='w-10 h-10 bg-gray-300 bg-opacity-80 animate-pulse'></div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
