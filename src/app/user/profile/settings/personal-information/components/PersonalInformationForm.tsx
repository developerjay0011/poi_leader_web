'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { UserDetails } from '@/utils/typesUtils'
import { Input } from '@/components/Input'
import { BLOOD_GROUPS } from '@/utils/utility'
import Link from 'next/link'

export const PersonalInformationForm: FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>()
  const maritalStatus = watch('maritalStatus')

  const formSubmitHandler = (data: UserDetails) => {
    console.log(data)
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
            options: [
              {
                id: 'male',
                value: 'male',
              },
              {
                id: 'female',
                value: 'female',
              },
              {
                id: 'others',
                value: 'others',
              },
            ],
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
            options: [
              {
                id: 'married',
                value: 'married',
              },
              {
                id: 'un-married',
                value: 'un married',
              },
              {
                id: 'divorced',
                value: 'divorced',
              },
            ],
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
            options: [
              { id: 'below 10th', value: 'below 10th' },
              { id: '10th pass', value: '10th pass' },
              { id: '12th pass', value: '12th pass' },
              { id: 'under graduate', value: 'under graduate' },
              { id: 'post graduate', value: 'post graduate' },
              { id: 'p.h.d', value: 'p.h.d' },
              { id: 'certificate', value: 'certificate' },
              { id: 'others', value: 'others' },
            ],
          }}
        />

        {/* <MultiSelectInput
          defaultValues={[]}
          id='profession'
          limit={5}
          options={professions.map((el) => ({
            id: el.professionId,
            val: el.professionName,
          }))}
          setValue={(val) =>
            setValue('profession', val.map((el) => el.val).join(', ') as string)
          }
          title='Profession'
          required
        /> */}

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
