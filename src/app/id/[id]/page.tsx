import { FC } from 'react'

const page: FC<{ params: { id: string } }> = ({ params }) => {
  console.log(params)
  return <>{params.id}</>
}

export default page
