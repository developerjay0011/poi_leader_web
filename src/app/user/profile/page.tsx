import { NetworksList } from '@/components/leader/NetworksList'
import { GeneralInfoBox } from '@/components/leader/GeneralInfoBox'
import { PersonalInfoBox } from '@/components/leader/PersonalInfoBox'

const AdminProfilePage = () => {
  return (
    <>
      <div className='flex gap-5 w-full max-[900px]:flex-col'>
        <div className='w-[28%] max-[1500px]:w-[31%] max-[1250px]:w-[35%] max-[1130px]:w-[38%] max-[900px]:w-full'>
          <PersonalInfoBox />
        </div>

        <div className='w-[72%] max-[1500px]:w-[69%] max-[1250px]:w-[65%] max-[1130px]:w-[62%] max-[900px]:w-full flex flex-col gap-5'>
          <GeneralInfoBox />
        </div>
      </div>
    </>
  )
}

export default AdminProfilePage
