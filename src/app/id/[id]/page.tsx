import { FC } from 'react'

const page: FC<{ params: { id: string } }> = ({ params }) => {

  return <>{params.id}</>
}

export default page
