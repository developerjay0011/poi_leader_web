import { ConnectToAPI } from '@/utils/utility'
import { AppDispatch } from '..'
import { agendaAction } from './agendaSlice'

const AGENDA_ENDPOINT = 'agenda'

export const fetchAllAgendas =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          id,
        },
      })

      const data = await ConnectToAPI(AGENDA_ENDPOINT, body)

      dispatch(agendaAction.storeAgendas(data.agendaList))
      dispatch(agendaAction.storeCategories(data.categoryList))

      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
