import { ConnectToAPI } from '@/utils/utility'
import { AppDispatch } from '..'

const POLL_ENDPOINT = 'polls'

export const fetchAllPolls = () => async (dispatch: AppDispatch) => {
  try {
    const body = JSON.stringify({
      eventID: '',
      addInfo: {},
    })

    const data = await ConnectToAPI(POLL_ENDPOINT, body)
  } catch (err: any) {
    console.error(err)
  }
}
