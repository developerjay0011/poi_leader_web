'use client'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserDetails } from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { BLOOD_GROUPS } from '@/utils/utility'
import Link from 'next/link'
import { dateConverterNumeric } from '@/utils/utility';
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
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>();
  const maritalStatus = watch('maritalStatus')

  const formSubmitHandler =async (data: UserDetails) => {
    const resBody: ProfileInfo = {
      first_name: data?.firstName,
      middle_name: data?.middleName,
      last_name: data?.lastName,
      gender: data?.gender,
      blood_group: data?.bloodGroup,
      father_name: data?.fatherName,
      mother_name: data?.motherName,
      dob: data?.dob,
      place_of_birth: data?.placeOfBirth,
      marital_status: data?.maritalStatus,
      hobbies: data?.hobbies,
      assets: data?.assests,
      higher_education: data?.higherEduction,
      no_of_daughters: data?.noOfDaughters,
      no_of_sons: data?.noOfSons,
      spouse_name: data?.spouseName
    };

    tryCatch(
      async () => {
        const response = await submitLeaderForm({
          ...leaderProfile,
          'personal_info':resBody,
          political_info: {
            ...leaderProfile?.political_info?.activity_pictures,
            activity_pictures: leaderProfile?.political_info?.activity_pictures || []
          }
        });
    
        if (response?.success) {
          // Update only personal info in redux store
          dispatch(leaderActions.setLeaderProfile({
            personal_info: resBody
          }));
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    );
  }

  useEffect(() => {
    const { personal_info } = leaderProfile;
    setValue('firstName', personal_info?.first_name || '');
    setValue('middleName', personal_info?.middle_name || '');
    setValue('lastName', personal_info?.last_name || '');
    setValue('gender', personal_info?.gender?.toLowerCase() || '');
    setValue('bloodGroup', personal_info?.blood_group || '');
    setValue('fatherName', personal_info?.father_name || '');
    setValue('motherName', personal_info?.mother_name || '');
    setValue('dob', moment(personal_info?.dob).format("YYYY-MM-DD"));
    setValue('placeOfBirth', personal_info?.place_of_birth || '');
    setValue('maritalStatus', personal_info?.marital_status?.toLowerCase() || '');
    setValue('hobbies', personal_info?.hobbies || '');
    setValue('assests', personal_info?.assets || '');
    setValue('higherEduction', personal_info?.higher_education || '');
    setValue('noOfDaughters', personal_info?.no_of_daughters || 0);
    setValue('noOfSons', personal_info?.no_of_sons || 0);
    setValue('spouseName', personal_info?.spouse_name || '');
  }, [leaderProfile, setValue]);

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
          id='firstName'
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
          id='middleName'
          register={register}
          title='Middle Name'
          type='text'
        />
        <Input
          errors={errors}
          id='lastName'
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
          id='bloodGroup'
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
          id='fatherName'
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
          id='motherName'
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
          id='placeOfBirth'
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
          id='maritalStatus'
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
        {maritalStatus && maritalStatus === 'married' && (
          <>
            <Input
              errors={errors}
              id='spouseName'
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
              id='noOfDaughters'
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
              id='noOfSons'
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
          id='assests'
          placeholder=''
          register={register}
          title='Assest & Liability'
          type='text'
        />
        <Input
          errors={errors}
          id='higherEduction'
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
