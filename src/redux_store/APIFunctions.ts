import { AESEncrypt, ConnectToAPI } from '@/utils/utility'
import { AppDispatch } from '.'
import { LoginFormFields, RegisterFormFields } from '@/utils/typesUtils'
import { uiActions } from './UI/uiSlice'
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// generating key pair
export const generateKeyPairs = () => {
  const crypt = new JSEncrypt({ default_key_size: '2048' })
  crypt.getKey()
  const publicKeyString = crypt.getPublicKey()
  const privateKeyString = crypt.getPrivateKey()

  // Function to convert JSEncrypt public key to RSA format
  const convertJSEncryptPublicKeyToRSA = (publicKey: string) => {
    const header = '-----BEGIN RSA PUBLIC KEY-----\n'
    const footer = '\n-----END RSA PUBLIC KEY-----'
    let pem = publicKey.replace(/\n/g, '')
    pem = (pem.match(/.{1,64}/g) as RegExpMatchArray).join('\n')
    pem = header + pem + footer
    return pem
  }

  const publicKeyInRSAFormat = publicKeyString
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s/g, '')

  const publicKeyInRSAString =
    convertJSEncryptPublicKeyToRSA(publicKeyInRSAFormat)

  try {
    // Store the keys in localStorage
    localStorage.setItem('publicKey', publicKeyInRSAString)
    localStorage.setItem('privateKey', privateKeyString)

    // Return the public and private keys
    return {
      publicKey: publicKeyInRSAString,
      privateKey: privateKeyString,
    }
  } catch (error) {
    // Handle any errors that occur during localStorage operations
    console.error('Error storing keys in localStorage:', error)
    throw error
  }
}

export const registerUser =
  (userInp: RegisterFormFields, guid: string) =>
  async (dispatch: AppDispatch) => {
    console.log('PREV ENV: ', process.env.URL)

    process.env['URL'] = '111'

    console.log('NEXT ENV: ', process.env.URL)

    dispatch(uiActions.setRegistering(true))
    dispatch(uiActions.setOtpErr({ errTxt: '', isErr: false }))

    try {
      const UniqueKey = guid.substring(0, 16)
      const { publicKey, privateKey } = generateKeyPairs()

      const crypt = new JSEncrypt({ default_key_size: '2048' })
      crypt.setPublicKey(publicKey) // setting public key

      const addInfo = JSON.stringify({
        email_id: 'umesh@gmail.com',
        country_code: '91',
        mobile_no: '8595723484',
        email_otp: '',
        guid: UniqueKey,
        otp: '753868',
      })

      const encryptedAddInfo = AESEncrypt(addInfo, UniqueKey) // encrypt addInfo data
      const addInfoHash = CryptoJS.SHA256(addInfo).toString() // hash of addInfo

      const kID = AESEncrypt(privateKey, UniqueKey) // encrypting private key
      const encryptHash = crypt.encrypt(addInfoHash) // encrytping hash using public key

      const body = JSON.stringify({
        eventID: '5',
        addInfo: {
          encData: encryptedAddInfo,
          guid: UniqueKey,
          encHashData: encryptHash,
          kID,
        },
      })

     

      const response = await ConnectToAPI(userInp.userType, body)
    } catch (err) {
      console.error(err)
      dispatch(uiActions.setRegistering(false))
    }
  }

export const verifyOTP =
  (userInp: RegisterFormFields, otp: number, guid: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(uiActions.setOtpErr({ errTxt: '', isErr: false }))
      dispatch(uiActions.setVerifying(true))
      dispatch(uiActions.setVetifyOtp(false))

      const body = JSON.stringify({
        eventID: '3',
        addInfo: {
          full_name: userInp.fullName,
          email_id: userInp.email,
          country_code: '91',
          guid: '12345678910',
          mobile_no: userInp.phoneNo,
          otp,
          email_otp: '',
        },
      })

      const res = await ConnectToAPI(userInp.userType, body)

      // stopping registering
      dispatch(uiActions.setRegistering(false))
      dispatch(uiActions.setVerifying(false))
      dispatch(uiActions.setVetifyOtp(true))
    } catch (err: any) {
      dispatch(uiActions.setOtpErr({ errTxt: err.message, isErr: true }))
      dispatch(uiActions.setVerifying(false))
      dispatch(uiActions.setVetifyOtp(false))
    }
  }

export const logUserIn =
  (userInp: LoginFormFields) => async (dispatch: AppDispatch) => {
    try {
      const val = Math.random().toString()

      // console.log(val)
      // this will store public key for encryption
      // process.env['ENC_ID'] = `${val}`

      dispatch(uiActions.setLogErr({ errTxt: '', isErr: false }))
      dispatch(uiActions.setLogging(true))
      dispatch(uiActions.setLogin(false))

      const body = JSON.stringify({
        eventID: '4',
        addInfo: {
          userId: userInp.userId,
          pass: userInp.password,
          guid: '12345678910',
        },
      })

      const response = await ConnectToAPI('https://localhost:7192/login', body)

      console.log(response)

      dispatch(uiActions.setLogging(false))
      dispatch(uiActions.setLogin(true))
      dispatch(uiActions.storeUserDetails(response.rData))
      dispatch(uiActions.setUserType(response.rData.userType))

      if (userInp.remember) {
        localStorage.setItem('authToken', 'bearer ' + response.jwt)
        localStorage.setItem(
          'userDetails',
          JSON.stringify({ jwt: response.jwt, ...response.rData })
        )
        dispatch(uiActions.setJWT('bearer ' + response.jwt))
      }
    } catch (err: any) {
      console.error(err)
      dispatch(uiActions.setLogErr({ errTxt: err.message, isErr: true }))
      dispatch(uiActions.setLogging(false))
      dispatch(uiActions.setLogin(false))
    }
  }
