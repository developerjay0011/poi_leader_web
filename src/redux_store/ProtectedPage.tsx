'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { cusDispatch } from './cusHooks'

import { GetBirthdayList, GetLeaderList, getFollowering, getFollowers, getNotification, getProfile, getTrendingLeaderList } from "@/redux_store/leader/leaderAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { getLetterTemplates, getLetters } from "@/redux_store/letter/letterApi";
import { letterActions } from "@/redux_store/letter/letterSlice";
import { getLeadersOptions } from "@/redux_store/common/commonAPI";
import { GetLeaderAddedPosts, GetPostsForLeader, getStoriesForLeader } from "@/redux_store/posts/postAPI";
import { postActions } from "@/redux_store/posts/postSlice";
import { getDirectory } from "@/redux_store/directory/directoryApi";
import { directoryAction } from "@/redux_store/directory/directorySlice";
import { GetDashboardEvents } from "@/redux_store/event/eventApi";
import { eventAction } from "@/redux_store/event/eventSlice";
import { getTickets, } from "@/redux_store/ticket/ticketApi";
import { ticketActions } from "@/redux_store/ticket/ticketSlice";
import { getGroups } from "@/redux_store/group/groupAPI";
import { groupActions } from "@/redux_store/group/groupSlice";
import { GetEmployees, GetSingleEmployeeDetail } from "@/redux_store/employee/employeeApi";
import { employeeAction } from "@/redux_store/employee/employeeApiSlice";
import { getDevelopment } from "@/redux_store/development/developmentApi";
import { developmentAction } from "@/redux_store/development/developmentSlice";
import { getAgenda, getCategory } from "@/redux_store/agenda/agendaApi";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { GetFiles } from "@/redux_store/filetype/filetypeApi";
import { fileAction } from "@/redux_store/filetype/filetypeSlice";
import { GetOfficeLocations } from "@/redux_store/location/locationApi";
import { locationAction } from "@/redux_store/location/locationSlice";
import { LogoutUser } from './auth/authAPI'


const getDashboard = [
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getFollowering(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setFollowing(res)),
  },
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getStoriesForLeader(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(postActions.storeStories(res)),
  },
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (id: any, dispatch: any) => await GetBirthdayList(), // No leaderId needed
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setBirthdayList(res)),
  },
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response: any = await GetPostsForLeader(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => { dispatch(postActions.setPost(res)) },
  },
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (id: any, dispatch: any) => await getTrendingLeaderList(), // No leaderId needed
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setTrendingLeader(res)),
  },
  {
    tab: ["user"],
    only_leader: true,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getFollowers(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setFollowers(res)),
  },
  {
    tab: ["user"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) { // Added conditional check
        const response = await GetDashboardEvents(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(eventAction.storeDashboardevents(res)),
  },
  {
    tab: ["user", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) { // Added conditional check
        const response = await GetLeaderAddedPosts(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(postActions.listPosts(res)),
  },
];

const getAny = [
  {
    tab: ["any"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => await getLeadersOptions(), // No leaderId needed
    onSave: (res: any, dispatch: any) => dispatch(commonActions.setLeaderOptions(res)),
  },
  {
    tab: ["any"],
    only_leader: "employee",
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (employeeId && leaderId) { // Check both employeeId and leaderId
        const response = await GetSingleEmployeeDetail({ leaderid: leaderId, employeeid: employeeId });
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(employeeAction.setemployedetails(res)),
  },
  {
    tab: ["any"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) { // Check both employeeId and leaderId
        const response = await await getNotification({ leaderId: leaderId, employeeId: employeeId })
        return response
      }
      return []
    },
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setNotification(res)),
  },
  {
    tab: ["any"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => await GetLeaderList(), // No leaderId needed
    onSave: (res: any, dispatch: any) => dispatch(leaderActions.setLeaderlist(res)),
  },
  {
    tab: ["any"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) { // Added conditional check
        const response = await GetFiles(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(fileAction.storeFiles(res)),
  },
];

const aplist = [
  {
    tab: ["events"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await GetDashboardEvents(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(eventAction.storeDashboardevents(res)),
  },
  {
    tab: ['feed'],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await GetLeaderAddedPosts(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(postActions.listPosts(res)),
  },
  {
    tab: ["directory", "networks"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getDirectory(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(directoryAction.storedirectory(res)),
  },
  {
    tab: ["directory", "networks", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getGroups(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(groupActions.storeGroups(res)),
  },
  {
    tab: ["manage letter", "manage lettertemplate", "ticket", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getLetters(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(letterActions.storeLetter(res)),
  },
  {
    tab: ["manage letter", "manage letter template", "ticket"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getLetterTemplates(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(letterActions.storeLetterTemplate(res)),
  },
  {
    tab: ["manage letter", "manage letter template", "ticket", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getTickets(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(ticketActions.storeTicket(res)),
  },
  {
    tab: ["manage location", "manage letter", "manage letter template", "ticket", "any"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await GetOfficeLocations(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(locationAction.storeLocation(res)),
  },
  {
    tab: ["manage employees"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await GetEmployees(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(employeeAction.storeemployees(res)),
  },
  {
    tab: ["manage categories", "agenda", "developments"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getCategory(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => { dispatch(agendaAction.storeCategories(res)); dispatch(developmentAction.storeCategories(res)) },
  },
  {
    tab: ["developments", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getDevelopment(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(developmentAction.storeDevelopments(res)),
  },
  {
    tab: ["agenda", "analytics"],
    only_leader: false,
    onCall: async (leaderId: any, dispatch: any, employeeId?: any) => {
      if (leaderId) {
        const response = await getAgenda(leaderId);
        return response
      }
    },
    onSave: (res: any, dispatch: any) => dispatch(agendaAction.storeAgendas(res)),
  },
];

export const ProtectedPage: FC<{ children: ReactNode, isLeader: any, userDetails: any, curRoute: any }> = ({ children, isLeader, userDetails, curRoute }) => {
  const dispatch = cusDispatch()
  const [userData, setUserData] = useState<any>(null)
  const path: any = curRoute?.split("/").at(-1)?.includes("-") ? curRoute?.split("/").at(-1)?.replaceAll("-", " ") : curRoute?.split("/").at(-1) || ""

  const GetHomePage = async (userDetails: any, timeout = 0) => {
    setTimeout(async () => {
      var userApi = getDashboard
      for (let i = 0; i < userApi.length; i++) {
        const element = userApi[i];
        const res = await element?.onCall(userDetails?.leaderId, dispatch)
        element?.onSave(res, dispatch);
      }
    }, timeout);
  }
  const getApiCall = async () => {
    try {
      var apifilter = aplist.filter((i: any) => (i?.only_leader == true && isLeader && i?.only_leader != "employee") || (i?.only_leader === false))

      if (path == "user" && isLeader) { GetHomePage(userDetails) }
      if (path != "user") {
        for (let i = 0; i < apifilter.length; i++) {
          const element = apifilter[i];
          setTimeout(async () => {
            if (element?.tab?.includes(path)) {
              const res = await element?.onCall(userDetails?.leaderId, dispatch, userDetails?.employeeId)
              element?.onSave(res, dispatch);
            }
          }, 1000);
        }
        if (userData == null && isLeader) { GetHomePage(userDetails, 4000) }
      }
      setUserData(userDetails)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getApiCall()
  }, [path]);
  useEffect(() => {
    setUserData(null);
    (async () => {
      if (userDetails?.leaderId) {
        const res = await getProfile(userDetails?.leaderId)
        if (res?.request_status !== "Approved" && res?.request_status !== "Re-submitted" && isLeader) {
          LogoutUser(dispatch, false)
          return;
        }
        dispatch(leaderActions.setLeaderProfile(res))
      }
      for (let i = 0; i < getAny.length; i++) {
        const element = getAny[i];
        const res = await element?.onCall(userDetails?.leaderId, dispatch, userDetails?.employeeId);
        element?.onSave(res, dispatch);
      }
    })()
  }, []);

  return children
}
