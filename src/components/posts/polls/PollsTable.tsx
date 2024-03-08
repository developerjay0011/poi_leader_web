'use client'
import { FC, useEffect } from 'react'
import { PollTableRow } from './PollTableRow'
import { tryCatch } from '@/config/try-catch'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deletePoll, getPolls } from '@/redux_store/polls/pollsApi'
import { pollActions } from '@/redux_store/polls/pollSlice'
import { ErrorTableRow } from '@/utils/ErrorTableRow'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'

interface PollsTableProps { }
export const PollsTable: FC<PollsTableProps> = () => {
  const { userDetails } = cusSelector((state) => state.auth);
  const { poll } = cusSelector((state) => state.poll);

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
    (async () => {
      getPoll()

    })();
  }, [userDetails, dispatch, userDetails?.leaderId]);
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
    <>
      <table>
        <thead className='border-b-2 capitalize text-lg'>
          <tr>
            <th className='text-left py-2'>#</th>
            <th className='text-left py-2'>Poll Title</th>
            <th className='py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>{

          poll.length ?
            poll?.map((pollitem: any, index: number) => {
              return (
                <PollTableRow
                  key={index}
                  access={pollitem?.access}
                  id={pollitem?.id}
                  imgOptions={pollitem?.poll_options}
                  index={1}
                  poll_options={pollitem?.poll_options}
                  pollType={pollitem?.polltype}
                  publishDate={pollitem?.publish_date}
                  title={pollitem?.title}
                  expiresAt={pollitem?.close_date}
                  view_access={pollitem?.view_access}
                  handleDelete={handlePollDelete}
                  votes_by={pollitem?.votes_by}
                />
              )
            }) : (
              <ErrorTableRow colNo={5} />)
        }

        </tbody>
      </table>
    </>
  )
}
