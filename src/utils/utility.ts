import { getReduxStoreValues } from '@/redux_store'
import { v4 } from 'uuid'
import { store } from '@/redux_store'
import { uiActions } from '@/redux_store/UI/uiSlice'
import { AES, mode, pad, enc } from 'crypto-js'
import moment from 'moment'
import toast from 'react-hot-toast'

export interface UserData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  image: string;
  personal_info: string;
  fcm_tokens: string;
  token: string;
  userId: string;
}

// UTILITY FUNCTION to Connect to API
export const ConnectToAPI = async (
  enpointORurl: string,
  body: string,
  jwt?: string
) => {
  const guid = '454545'
  const userType = getReduxStoreValues().UI.userType
  const Authorization = jwt
    ? jwt
    : (getReduxStoreValues().UI.jsonWebToken as string)

  // if we are getting a proper url then we perform API call on that URL otherwise we will use URL defined above followed by endpoint provied
  // const url = enpointORurl.includes('/')
  //   ? enpointORurl
  //   : API_URL + '/' + enpointORurl

  // FOR DEV
  // console.log('URL: ', url)

  let response

  // Calling Dotnet API
  if (enpointORurl.includes('/'))
    response = await fetch(enpointORurl, {
      method: 'POST',
      body,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type,*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        'Content-Type': 'application/json',
        Authorization,
        guid,
      },
    })
  // Calling my custom Next.JS API (build using API routes)
  else
    response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        token: Authorization,
        guid,
        endpoint: enpointORurl,
        body: JSON.parse(body),
        userType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

  // to handle expired JWT error
  if (response.status === 401) store.dispatch(uiActions.setLogin(false))

  // RESPONSE
  const data = await response.json()

  // FOR DEV
  console.log('RESPONSE: ', data)

  // Handling Error
  if (data.rStatus !== 0) throw new Error(data.rData.rMessage)

  console.log('EVENT_ID: ' + data.eventID)

  // returning data if no error occured
  return data.rData
}




// Function to convert date in easy to read format
export const dateConverter = (date: string) => date ? new Intl.DateTimeFormat('en-IN', { month: 'short', day: '2-digit', year: 'numeric', }).format(new Date(date)) : ""

// Convert file to base64
export const convertFileToBase64: (u: File) => Promise<string> = (
  userInpFile: File
) =>
  new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(userInpFile)

    reader.onload = () => {
      resolve(reader.result as string)
    }
  })

// Function to convert files in base64
export const convertFileToBase64Emergin: (
  file: File
) => Promise<{ base64: string }> = (userInpFile: File) =>
    new Promise((resolve) => {
      const reader = new FileReader()

      reader.readAsDataURL(userInpFile)

      reader.onload = () => {
        resolve({
          base64: reader.result as string,
        })
      }
    })

// FUNCTION TO CALCULATE CURRENT DATE
export const calCurrentDate = (userInpDate: string) => {
  const curDate = new Date()
  const userDate = new Date(userInpDate as string)

  let day = curDate.getDate() - userDate.getDate()
  let month = curDate.getMonth() - userDate.getMonth()
  let year = curDate.getFullYear() - userDate.getFullYear()

  const daysInCurMonth = new Date(
    curDate.getFullYear(),
    curDate.getMonth() - 1,
    0
  ).getDate()

  if (day < 0) {
    month -= 1
    day = daysInCurMonth - -day
  }

  if (month < 0) {
    month = 12 - -month
    year -= 1
  }

  return year
}

// utility function to convert date into date and time string to set it as default value in html input field
export const dateTimeConverter = (inp: string, extraTime: number) => {
  const date = new Date(inp)

  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0') +
    'T' +
    (date.getHours() + extraTime).toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  )
}

export const dateConverterNumeric = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
    .format(new Date(date))
    .split('/')
    .join('-')

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const BLOOG_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const GenerateId = () => v4().split('-').join('') // Function to generate Random and Unique ID

export type PRIORITY = 'high' | 'moderate' | 'low'

export const PRIORITIES = {
  low: { classes: 'bg-green-600 text-green-50 border-green-600', name: 'low' },
  moderate: {
    classes: 'bg-yellow-600 text-yellow-100 border-yellow-600',
    name: 'moderate',
  },
  high: { classes: 'bg-rose-600 text-rose-100 border-rose-600', name: 'high' },
}

export type AGENDA_VAL = '0' | '1' | '2'

export const AGENDA_STATUS = {
  '0': {
    name: 'completed',
    classes: 'bg-green-100 text-green-600 border-green-600',
  },
  '1': {
    name: 'in progress',
    classes: 'bg-yellow-100 text-yellow-600 border-yellow-600 ',
  },
  '2': {
    name: 'not started yet',
    classes: 'bg-orange-100 text-orange-600 border-orange-600',
  },
}

export const SECRET_KEY =
  '6691b1c1238c724c1ee20a00b2f8c09da9a1f25f73985ed33a1a0b298c057951'

export const userImg = ''

export const bgIMG = ''

export const friendImg = ''

export const user2Img = ''

// AES Encrypt
export const AESEncrypt = (addInfoString: string, encryptionKey: string) => {
  const options = {
    mode: mode.CBC,
    padding: pad.Pkcs7,
    iv: enc.Utf8.parse(encryptionKey.substring(0, 16)),
  }

  const encryptedData = AES.encrypt(
    encryptionKey.substring(0, 16) + addInfoString,
    enc.Utf8.parse(encryptionKey.substring(0, 16)),
    options
  ).toString()
  return encryptedData
}

export const USER_TYPE = {
  leader: 'leader',
  emergingLeader: 'emerging leader',
  citizen: 'citizen',
}

export const localStorageKeys = {
  lastRouteVisited: 'L_URI',
  jwtToken: 'U_SESSION',
  userDetails: 'U_DT',
}

// Function to encrypt and store public key
export const CheckTime = (start: any, end: any) => {
  var startdate = moment(start, "YYYY-MM-DD HH:mm:ss")
  var enddate = moment(end, "YYYY-MM-DD HH:mm:ss")
  if (startdate.isBefore(enddate)) {
    return true
  } else {
    toast.error("Please Enter Proper Date & Time Range")
    return false
  }
}