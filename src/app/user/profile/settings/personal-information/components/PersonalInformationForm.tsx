'use client'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserDetails } from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { BLOOD_GROUPS } from '@/utils/utility'
import Link from 'next/link'
import moment from 'moment';
import { submitLeaderForm } from '@/redux_store/APIFunctions'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { EducationDropdowns, GenderDropdowns, MaritalStatusDropdowns, ToastType } from '@/constants/common'
import { ProfileInfo } from '@/interfaces/leader'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'

export const PersonalInformationForm: FC = () => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();

  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserDetails>({
    defaultValues: {
      ...leaderProfile.personal_info
    }
  });

  const maritalStatus = watch('marital_status');

  useEffect(() => {
    const { personal_info } = leaderProfile;
    reset({
      ...personal_info,
      dob: moment(personal_info?.dob).format("YYYY-MM-DD")
    })
  }, [leaderProfile, reset]);

  const formSubmitHandler = async (data: UserDetails) => {
    const resBody: ProfileInfo = { ...data };

    tryCatch(
      async () => {
        const param = {
          ...leaderProfile,
          'personal_info': resBody,
        }
        const response = await submitLeaderForm(param);
        if (response?.success) {
          dispatch(leaderActions.setLeaderProfile({ personal_info: resBody }));
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    );
  }

  return (
    <>
      <form
        className='grid grid-cols-2 gap-x-4 gap-y-5'
        onSubmit={handleSubmit(formSubmitHandler)}>
        <h2 className='text-4xl font-semibold col-span-full mb-5'>
          Personal Information
        </h2>

        <Input
          errors={errors}
          id="first_name"
          placeholder='narendar'
          register={register}
          title='First Name'
          type='text'
          required
          validations={{
            required: 'First name is required',
          }}
        />
        <Input
          errors={errors}
          id='middle_name'
          register={register}
          title='Middle Name'
          type='text'
        />
        <Input
          errors={errors}
          id='last_name'
          placeholder='modi'
          register={register}
          title='Last Name'
          type='text'
          required
          validations={{
            required: 'Last name is required',
          }}
        />
        <Input
          errors={errors}
          id='gender'
          selectField={{
            title: 'select gender',
            options: GenderDropdowns,
          }}
          register={register}
          title='Gender'
          type='select'
          required
          validations={{
            required: 'Gender is required',
          }}
        />
        <Input
          errors={errors}
          id='blood_group'
          selectField={{
            title: 'select blood group',
            options: BLOOD_GROUPS.map((el) => ({ id: el, value: el })),
          }}
          register={register}
          title='Blood Group'
          type='select'
          required
          validations={{
            required: 'Blood Group is required',
          }}
        />
        <Input
          errors={errors}
          id='father_name'
          placeholder='Damodardas Mulchand Modi'
          register={register}
          title='Father Name'
          type='text'
          required
          validations={{
            required: 'Father name is required',
          }}
        />
        <Input
          errors={errors}
          id='mother_name'
          placeholder='Heeraben Modi'
          register={register}
          title='Mother Name'
          type='text'
          required
          validations={{
            required: 'Mother name is required',
          }}
        />
        <Input
          errors={errors}
          id='dob'
          register={register}
          title='Date of Birth'
          type='date'
          required
          validations={{
            required: 'Date of Birth is required',
          }}
        />
        <Input
          errors={errors}
          id='place_of_birth'
          placeholder='Vadnagar'
          register={register}
          title='Place of Birth'
          type='text'
          required
          validations={{
            required: 'Place of Birth is required',
          }}
        />
        <Input
          errors={errors}
          id='marital_status'
          selectField={{
            title: 'select marital status',
            options: MaritalStatusDropdowns,
          }}
          register={register}
          title='Marital Status'
          type='select'
          required
          validations={{
            required: 'Marital Status is required',
          }}
        />
        {/* Conditional Data based on maritalStatus */}
        {maritalStatus && maritalStatus === 'Married' && (
          <>
            <Input
              errors={errors}
              id='spouse_name'
              placeholder='Jashodaben Modi'
              register={register}
              title='Spouse Name'
              type='text'
              required
              validations={{
                required: 'Spouse Name is required',
              }}
            />

            <Input
              errors={errors}
              id='no_of_daughters'
              placeholder=''
              register={register}
              title='No of Daughters'
              type='number'
              required
              validations={{
                required: "Daughter's count is required",
              }}
            />

            <Input
              errors={errors}
              id='no_of_sons'
              placeholder=''
              register={register}
              title='No of Sons'
              type='number'
              required
              validations={{
                required: "Son's count is required",
              }}
            />
          </>
        )}
        <Input
          errors={errors}
          id='hobbies'
          placeholder='cricket'
          register={register}
          title='Hobbies OR Interests'
          type='text'
        />
        <Input
          errors={errors}
          id='assets'
          placeholder=''
          register={register}
          title='Assest & Liability'
          type='text'
        />
        <Input
          errors={errors}
          id='higher_education'
          required
          validations={{ required: 'Higher Education is required' }}
          register={register}
          title='Higher Education'
          type='select'
          selectField={{
            title: 'Select Higher Education',
            options: EducationDropdowns,
          }}
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
