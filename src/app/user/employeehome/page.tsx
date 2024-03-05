'use client'

import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";

const AdminProfileFeedsPage = () => {


  return (
    <>
      <div className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
        <div className="flex flex-col gap-5 self-start max-[1200px]:w-[90%] w-[24%]">
          <ShortcutsBox />
        </div>
      </div>
    </>
  );
};

export default AdminProfileFeedsPage;
