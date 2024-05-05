'use client'
import { ReactNode, FC, useEffect } from 'react'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { getProfile } from '@/redux_store/leader/leaderAPI'

const AdminProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { userDetails } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();
  useEffect(() => {
    (async () => {
      if (userDetails?.leaderId) {
        const res = await getProfile(userDetails?.leaderId);
        dispatch(leaderActions.setLeaderProfile(res));
      }
    })()
  }, [dispatch, userDetails?.leaderId]);
  return (
    <>
      <section className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
        <section className='w-full relative'>{children}</section>
      </section>
    </>
  )
}

export default AdminProfileLayout
