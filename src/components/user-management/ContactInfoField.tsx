import { FC } from 'react'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { Input } from './Input'
import { ErrorMessage } from '@hookform/error-message'
import { YesNoField } from './YesNoField'
import { DistrictDetails, LeaderFormFields, PincodeDetails, StateDetails } from './AddLeaderPage'

interface ContactInfoFieldProps {
  errors: FieldErrors<LeaderFormFields>
  watch: UseFormWatch<LeaderFormFields>
  register: UseFormRegister<LeaderFormFields>
  setValue: UseFormSetValue<LeaderFormFields>
  states: StateDetails[]
  districts: DistrictDetails[]
  pincodes: PincodeDetails[]
}

export const ContactInfoField: FC<ContactInfoFieldProps> = ({
  errors,
  register,
  watch,
  setValue,
  districts,
  states,
}) => {
  const bothAddressIsSame = watch('bothAddressIsSame')
  const pAddress = watch('pAddress')
  const pState = watch('pState')
  const pDistrict = watch('pDistrict')
  const pPincode = watch('pPincode')
  const cState = watch('cState')
  const cDistrict = watch('cDistrict')

  return (
    <>
      <h3 className='col-span-full text-xl  font-semibold'>
        Permanent Address
      </h3>

      <label htmlFor={`pAddress`} className='col-span-full flex flex-col gap-2'>
        <span>
          Full Address <strong className='text-red-500'>*</strong>
        </span>
        <textarea
          {...register(`pAddress`, {
            required: 'Address is required',
          })}
          placeholder=''
          id={`pAddress`}
          className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${
            errors.pAddress
              ? 'bg-red-100 text-red-500 border-red-400'
              : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}
          rows={4}></textarea>
        <ErrorMessage
          as={'span'}
          errors={errors}
          name='pAddress'
          className='text-sm text-red-500'
        />
      </label>

      <Input
        errors={errors}
        register={register}
        title='State'
        id='pState'
        type='select'
        required
        validations={{
          required: 'State is required',
        }}
        selectField={{
          title: 'Select State',
          options: states?.map((el) => ({
            id: el.id,
            value: el.state,
          })),
        }}
      />
      <Input
        errors={errors}
        register={register}
        title='District'
        id='pDistrict'
        type='select'
        required
        validations={{
          required: 'District is required',
        }}
        selectField={{
          title: 'Select District',
          options: districts
            .filter((el) => (pState && el.stateid === pState))
            ?.map((el) => ({ id: el.id, value: el.district })),
        }}
      />
      <Input
        errors={errors}
        register={register}
        title='Pincode'
        id='pPincode'
        type='text'
        validations={{
          required: 'Pincode is required',
        }}
      />

      <YesNoField
        errors={errors}
        id='bothAddressIsSame'
        question='Present and Permanent Address is Same'
        register={register}
        fullWidth
        validations={{
          onChange(e) {
            const val = e.target.value

            // If both address is same then we will set the present Addresses values to permanent Address
            if (val === 'yes') {
              // below conditions will either set the permanent address values or empty strings.
              setValue('cAddress', pAddress || '')
              setValue('cState', pState || '')
              setValue('cDistrict', pDistrict || '')
              setValue('cPincode', pPincode || '')
            } else {
              setValue('cAddress', '')
              setValue('cDistrict', '')
              setValue('cPincode', '')
              setValue('cState', '')
            }
          },
        }}
      />

      {bothAddressIsSame && bothAddressIsSame === 'no' && (
        <>
          <h3 className='col-span-full text-xl font-semibold'>
            Present Address
          </h3>

          <label
            htmlFor={`cAddress`}
            className='col-span-full flex flex-col gap-2'>
            <span>
              Full Address <strong className='text-red-500'>*</strong>{' '}
            </span>
            <textarea
              {...register(`cAddress`, {
                required: 'Address is required',
              })}
              placeholder=''
              id={`cAddress`}
              className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${
                errors.cAddress
                  ? 'bg-red-100 text-red-500 border-red-400'
                  : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
              }`}
              rows={4}></textarea>
            <ErrorMessage
              as={'span'}
              errors={errors}
              name='cAddress'
              className='text-sm text-red-500'
            />
          </label>

          <Input
            errors={errors}
            register={register}
            title='State'
            id='cState'
            type='select'
            required
            validations={{
              required: 'State is required',
            }}
            selectField={{
              title: 'Select State',
              options: states.map((el) => ({
                id: el.id,
                value: el.state,
              })),
            }}
          />
          <Input
            errors={errors}
            register={register}
            title='District'
            id='cDistrict'
            type='select'
            required
            validations={{
              required: 'District is required',
            }}
            selectField={{
              title: 'Select District',
              options: districts
                .filter((el) => (cState && el.stateid === cState))
                ?.map((el) => ({ id: el.id, value: el.district })),
            }}
          />
          <Input
            errors={errors}
            register={register}
            title='Pincode'
            id='cPincode'
            type='text'
            validations={{
              required: 'Pincode is required',
            }}
          />
        </>
      )}

      <div className='col-span-full mt-3' />

      <Input
        type='textarea'
        fullWidth
        rows={2}
        errors={errors}
        register={register}
        id='telePhoneNos'
        title="Telephone / Landline No's"
        required
        validations={{
          required: 'Telephone No is required',
        }}
        placeholder='use "," for multiple values'
      />

      <Input
        type='textarea'
        fullWidth
        rows={2}
        errors={errors}
        register={register}
        id='mobileNos'
        title={"Mobile No's"}
        required
        validations={{
          required: 'Mobile No is required',
        }}
        placeholder='use "," for multiple values'
      />

      <Input
        errors={errors}
        register={register}
        title='Facebook Account Link'
        id={'socialMedia.facebook' as keyof LeaderFormFields}
        type='url'
        placeholder='www.facebook.com/user'
      />
      <Input
        errors={errors}
        register={register}
        title='Instagram Account Link'
        id={'socialMedia.instagram' as keyof LeaderFormFields}
        type='url'
        placeholder='www.instagram.com/user'
      />
      <Input
        errors={errors}
        register={register}
        title='X / Twitter Account Link'
        id={'socialMedia.twitter' as keyof LeaderFormFields}
        type='url'
        placeholder='www.twitter.com/user'
      />
    </>
  )
}
