'use client'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Basicinfo, UserDetails } from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { BLOOD_GROUPS } from '@/utils/utility'
import moment from 'moment';
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { EducationDropdowns, GenderDropdowns, MaritalStatusDropdowns } from '@/constants/common'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { getRejectedFieldsObject } from '../utils'

interface PersonalInformationFormProps {
  setPage: (data: any) => void;
}
export const PersonalInformationForm: FC<PersonalInformationFormProps> = ({ setPage }) => {
  const { leaderProfile, reasons } = cusSelector((state) => state.leader);

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
    },
  });
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    watch: watch2,
    reset: reset2,
    getValues: getValues2
  } = useForm<Basicinfo>({
    defaultValues: {
      email: leaderProfile?.email,
      mobile: leaderProfile?.mobile,
      username: leaderProfile?.username,
      about_me: leaderProfile?.about_me,
    },
  });
  const maritalStatus = watch('marital_status');

  useEffect(() => {
    const { personal_info } = leaderProfile;
    const userdetails = {
      email: leaderProfile?.email,
      mobile: leaderProfile?.mobile,
      username: leaderProfile?.username,
      about_me: leaderProfile?.about_me
    }
    var personal_infolist = leaderProfile?.request_status === "Rejected" && Array.isArray(reasons) ? getRejectedFieldsObject(reasons) : {}
    var userdetailslist = leaderProfile?.request_status === "Rejected" && Array.isArray(reasons) ? getRejectedFieldsObject(reasons) : {}
    reset({
      ...personal_info,
      dob: moment(personal_info?.dob).format("YYYY-MM-DD"),
      ...personal_infolist,
    })
    reset2({
      ...userdetails,
      ...userdetailslist
    });
  }, [leaderProfile, reset, reset2]);


  const handleNextClick = async (data: any) => {
    const userData = getValues2() as Basicinfo;
    const param = {
      ...leaderProfile,
      ...userData,
      'personal_info': data,
    }
    dispatch(leaderActions.setLeaderProfile(param));
    setPage('1')
  };


  return (
    <>
      <form className='grid grid-cols-2 gap-x-4 gap-y-5'>
        <h2 className='text-4xl font-semibold col-span-full mb-5'>
          Basic Information
        </h2>
        <Input
          errors={errors2}
          id="username"
          placeholder='narendar'
          register={register2 as any}
          title='User name'
          type='text'
          required
          validations={{
            required: 'User name is required',
          }}
        />
        <Input
          errors={errors2}
          id='email'
          register={register2 as any}
          title='E-mail'
          type='text'
          required
          validations={{
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message:
                "Please enter a valid email EX: something@example.com",
            },
          }}
        />
        <Input
          errors={errors2}
          id="mobile"
          register={register2 as any}
          title='Mobile No.'
          type='number'
          required
          validations={{
            required: 'Mobile no is required',
            validate: {
              validMobileNo(no) {
                return (
                  no?.toString().length === 10 ||
                  'Please Enter a Valid Number'
                )
              },
            },
          }}
        />
        <Input
          errors={errors2}
          id="about_me"
          register={register2 as any}
          title='About me.'
          type='textarea'
        />
      </form>
      <form
        className='grid grid-cols-2 gap-x-4 gap-y-5'
        onSubmit={handleSubmit(handleNextClick)}
      >

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
          max={moment().format("YYYY-MM-DD")}
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
          id='profession'
          required
          placeholder=''
          register={register}
          title='Profession'
          type='text'
        />
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
          <button
            className='rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize'
            type='submit'>
            Next
          </button>
        </div>
      </form>
    </>
  )
}
