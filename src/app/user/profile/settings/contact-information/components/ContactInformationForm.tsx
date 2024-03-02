'use client'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  UserDetails,
} from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { YesNoField } from '@/components/YesNoField'
import Link from 'next/link'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from "@/redux_store/common/commonSlice";
import { submitLeaderForm } from '@/redux_store/APIFunctions'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { tryCatch } from '@/config/try-catch'
import { ContactInfo } from '@/interfaces/leader'
import { ToastType } from '@/constants/common'
import { ProtectedRoutes } from '@/constants/routes'
export const ContactForm: FC = () => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { leaderOptions } = cusSelector((state) => state.common);
  const dispatch = cusDispatch();
  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>({
    defaultValues: {
      ...leaderProfile.contact_info,
    },
    mode: 'onTouched',
  });

  const bothAddressIsSame = watch('bothAddressIsSame')
  const pAddress = watch("permanent_address");
  const pState = watch("permanent_state_id");
  const pDistrict = watch("permanent_district_id");
  const pPincode = watch("permanent_pincode");
  const cState = watch("present_state_id");

  const formSubmitHandler = async (data: UserDetails) => {
    const resBody: ContactInfo = { ...data, is_same_as_permanent: data?.bothAddressIsSame === 'yes' ? true : false, };
    tryCatch(
      async () => {
        const response = await submitLeaderForm({ ...leaderProfile, 'contact_info': resBody, });
        if (response?.success) {
          dispatch(leaderActions.setLeaderProfile({ contact_info: resBody }));
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    );
  }
  useEffect(() => {
    const { contact_info } = leaderProfile;
    reset({
      ...contact_info,
      bothAddressIsSame: leaderProfile.contact_info?.is_same_as_permanent ? "yes" : null
    })
  }, [leaderProfile, reset]);

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
          htmlFor={`permanent_address`}
          className='col-span-full flex flex-col gap-2'>
          <span>
            Full Address <strong className='text-red-500'>*</strong>
          </span>
          <textarea
            {...register(`permanent_address`, {
              required: 'Address is required',
            })}
            placeholder=''
            id={"permanent_address"}
            className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${errors.permanent_address
              ? 'bg-red-100 text-red-500 border-red-400'
              : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
              }`}
            rows={4}></textarea>
          <ErrorMessage
            as={'span'}
            errors={errors}
            name='permanent_address'
            className='text-sm text-red-500'
          />
        </label>

        <Input
          errors={errors}
          register={register}
          title='State'
          id='permanent_state_id'
          type='select'
          required
          validations={{
            required: 'State is required',
          }}
          selectField={{
            title: 'Select State',
            options: leaderOptions?.states.map((el) => ({
              id: el.id,
              value: el.state,
            })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='District'
          id='permanent_district_id'
          type='select'
          required
          validations={{
            required: 'District is required',
          }}
          selectField={{
            title: 'Select District',
            options: leaderOptions?.districts
              .filter((el) => (pState ? el.stateid === pState : el))
              .map((el) => ({ id: el.id, value: el.district })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='Pincode'
          id='permanent_pincode'
          type='text'
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
                setValue('present_address', pAddress || '')
                setValue('present_state_id', pState || '')
                setValue('present_district_id', pDistrict || '')
                setValue('present_pincode', pPincode || '')
              } else {
                setValue('present_address', '')
                setValue('present_district_id', '')
                setValue('present_pincode', '')
                setValue('present_state_id', '')
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
              htmlFor={`present_address`}
              className='col-span-full flex flex-col gap-2'>
              <span>
                Full Address <strong className='text-red-500'>*</strong>{' '}
              </span>
              <textarea
                {...register(`present_address`, {
                  required: 'Address is required',
                })}
                placeholder=''
                id="present_address"
                className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${errors.present_address
                  ? 'bg-red-100 text-red-500 border-red-400'
                  : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
                  }`}
                rows={4}></textarea>
              <ErrorMessage
                as={'span'}
                errors={errors}
                name='present_address'
                className='text-sm text-red-500'
              />
            </label>

            <Input
              errors={errors}
              register={register}
              title='State'
              id='present_state_id'
              type='select'
              required
              validations={{
                required: 'State is required',
              }}
              selectField={{
                title: 'Select State',
                options: leaderOptions?.states.map((el) => ({
                  id: el.id,
                  value: el.state,
                })),
              }}
            />
            <Input
              errors={errors}
              register={register}
              title='District'
              id='present_district_id'
              type='select'
              required
              validations={{
                required: 'District is required',
              }}
              selectField={{
                title: 'Select District',
                options: leaderOptions?.districts
                  .filter((el) => (cState ? el.stateid === cState : el))
                  .map((el) => ({ id: el.id, value: el.district })),
              }}
            />
            <Input
              errors={errors}
              register={register}
              title='Pincode'
              id='present_pincode'
              type='text'
            />
          </>
        )}

        <div className='col-span-full mt-3' />

        <Input
          type='number'
          errors={errors}
          register={register}
          id='telephones'
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
          id='mobile_nos'
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
          id={'fb_link'}
          type='url'
          placeholder='www.facebook.com/user'
        />
        <Input
          errors={errors}
          register={register}
          title='Instagram Account Link'
          id={'insta_link'}
          type='url'
          placeholder='www.instagram.com/user'
        />
        <Input
          errors={errors}
          register={register}
          title='X / Twitter Account Link'
          id={'twitter_link'}
          type='url'
          placeholder='www.twitter.com/user'
        />

        <div className='flex justify-end col-span-full gap-2 mt-5'>
          <Link
            href={ProtectedRoutes.userProfile}
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
