'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  DistrictDetails,
  PincodeDetails,
  StateDetails,
  UserDetails,
} from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { YesNoField } from '@/components/YesNoField'
import Link from 'next/link'

export const ContactForm: FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>({
    defaultValues: {
      bothAddressIsSame: 'yes',
    },
    mode: 'onTouched',
  })

  const districts: DistrictDetails[] = [],
    pincodes: PincodeDetails[] = [],
    states: StateDetails[] = []

  const bothAddressIsSame = watch('bothAddressIsSame')
  const pAddress = watch('pAddress')
  const pState = watch('pState')
  const pDistrict = watch('pDistrict')
  const pPincode = watch('pPincode')
  const cState = watch('cState')
  const cDistrict = watch('cDistrict')

  const formSubmitHandler = (data: UserDetails) => {
    console.log(data)
  }

  return (
    <>
      <form
        className='grid grid-cols-3 gap-x-4 gap-y-5'
        onSubmit={handleSubmit(formSubmitHandler)}>
        <h2 className='text-4xl font-semibold col-span-full mb-5'>
          Contact Information
        </h2>

        <h3 className='col-span-full text-xl font-semibold'>
          Permanent Address
        </h3>

        <label
          htmlFor={`pAddress`}
          className='col-span-full flex flex-col gap-2'>
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
            options: states.map((el) => ({
              id: el.stateId,
              value: el.stateName,
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
              .filter((el) => (pState ? el.stateId === pState : el))
              .map((el) => ({ id: el.districtId, value: el.districtName })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='Pincode'
          id='pPincode'
          type='select'
          selectField={{
            title: 'Select Pincode',
            options:
              pincodes
                .find((el) => el.districtId === pDistrict)
                ?.pincodes.map((el) => ({ id: el, value: el })) || [],
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
                  id: el.stateId,
                  value: el.stateName,
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
                  .filter((el) => (cState ? el.stateId === cState : el))
                  .map((el) => ({ id: el.districtId, value: el.districtName })),
              }}
            />
            <Input
              errors={errors}
              register={register}
              title='Pincode'
              id='cPincode'
              type='select'
              selectField={{
                title: 'Select Pincode',
                options:
                  pincodes
                    .find((el) => el.districtId === cDistrict)
                    ?.pincodes.map((el) => ({ id: el, value: el })) || [],
              }}
            />
          </>
        )}

        <div className='col-span-full mt-3' />

        <Input
          type='number'
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
          type='number'
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
          id={'socialMedia.facebook' as keyof UserDetails}
          type='url'
          placeholder='www.facebook.com/user'
        />
        <Input
          errors={errors}
          register={register}
          title='Instagram Account Link'
          id={'socialMedia.instagram' as keyof UserDetails}
          type='url'
          placeholder='www.instagram.com/user'
        />
        <Input
          errors={errors}
          register={register}
          title='X / Twitter Account Link'
          id={'socialMedia.twitter' as keyof UserDetails}
          type='url'
          placeholder='www.twitter.com/user'
        />

        <div className='flex justify-end col-span-full gap-2 mt-5'>
          <Link
            href={'/user/profile'}
            className='rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50'>
            close
          </Link>
          <button
            className='rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize'
            type='submit'>
            Save
          </button>
        </div>
      </form>
    </>
  )
}
