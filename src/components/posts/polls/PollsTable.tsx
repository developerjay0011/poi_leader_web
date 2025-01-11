'use client'
import { FC, useEffect } from 'react'
import { PollTableRow } from './PollTableRow'
import { tryCatch } from '@/config/try-catch'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deletePoll, getPolls } from '@/redux_store/polls/pollsApi'
import { pollActions } from '@/redux_store/polls/pollSlice'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'

interface PollsTableProps { polls: any }
export const PollsTable: FC<PollsTableProps> = ({ polls }) => {
  const { userDetails } = cusSelector((state) => state.auth);

  const dispatch = cusDispatch();

  const getPoll = async () => {
    tryCatch(
      async () => {
        const Data = await getPolls(userDetails?.leaderId as string);
        dispatch(pollActions.storePoll(Data))
      }
    )
  }
  useEffect(() => {
    (async () => { getPoll() })();
  }, [dispatch, userDetails?.leaderId]);
  const handlePollDelete = async (id: string) => {
    tryCatch(
      async () => {
        const response = await deletePoll(id, userDetails?.leaderId as string);
        if (response?.success) {
          getPoll()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }
  return (
    <PollTableRow
      handleDelete={handlePollDelete}
      polls={polls}
    />
  )
}
