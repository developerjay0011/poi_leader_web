// import { ConnectToAPI } from '@/utils/utility'
// import { AppDispatch } from '..'
// import { agendaAction } from './agendaSlice'

// const AGENDA_ENDPOINT = 'agenda'

// export const fetchAllAgendas =
//   (id: string) => async (dispatch: AppDispatch) => {
   
//     try {
//       const body = JSON.stringify({
//         eventID: '0001',
//         addInfo: {
//           id,
//         },
//       })
     
//       const data = await ConnectToAPI(AGENDA_ENDPOINT, body)
//       console.warn("agendaList", data.agendaList)
//       dispatch(agendaAction.storeAgendas(data.agendaList))
//       dispatch(agendaAction.storeCategories(data.categoryList))

//       console.log(data)
//     } catch (err) {
//       alert(err)
//       console.error(err)
//     }
//   }

import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const getAgenda = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAgenda, { userId }));
      return res.data;
    }
  );
};