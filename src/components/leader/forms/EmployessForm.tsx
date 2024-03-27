import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { AddEditEmployee, GetEmployees } from '@/redux_store/employee/employeeApi'
import { employeeAction } from '@/redux_store/employee/employeeApiSlice'
import { Modal } from '@/components/modal/modal'
import { Input } from '@/components/Input'

interface ManageEmployessFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
  edit?: boolean
  employeedetails: any
}

export interface FormFields {
  fullname: string
  username: string
  email: string
  id: string,
  leaderid: string,
  phoneno: string
  location: string
  password: string
  isactive: string
}

export const ManageEmployessForm: FC<ManageEmployessFormProps> = ({ onClose, submitting, heading, edit, employeedetails, }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const { location } = cusSelector((state) => state.location);
  const dispatch = cusDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<FormFields>({})
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        const body = {
          id: employeedetails?.id ? employeedetails?.id : null,
          leaderid: userDetails?.leaderId,
          fullname: data?.fullname,
          username: data?.username,
          email: data?.email,
          phoneno: data?.phoneno,
          password: data?.password,
          location: data?.location,
          isactive: data?.isactive == 'true' ? true : false,
        };
        const response = await AddEditEmployee(body);
        if (response?.success) {
          const Data = await GetEmployees(userDetails?.leaderId as string);
          dispatch(employeeAction.storeemployees(Data))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  }

  useEffect(() => {
    if (edit) {
      reset({
        id: employeedetails?.id,
        fullname: employeedetails?.fullname,
        username: employeedetails?.username,
        email: employeedetails?.email,
        phoneno: employeedetails?.phoneno,
        password: employeedetails?.password,
        location: employeedetails?.locationid,
        isactive: String(employeedetails?.isactive),
      })
    }
  }, [reset])


  return (
    <Modal heading={heading} onClose={onClose}>
      <form
        className='flex flex-col py-5 gap-4 max-[550px]:px-4'
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}>
        <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>

          <Input
            register={register}
            errors={errors}
            title="Full Name"
            type="text"
            id={"fullname"}
            required
            validations={{
              required: 'fullname is required'
            }}
          />


          <Input
            register={register}
            errors={errors}
            title="User Name"
            type="text"
            id={"username"}
            required
            validations={{
              required: 'username is required',
            }}
          />


          <Input
            register={register}
            errors={errors}
            title="E-mail"
            type="email"
            id={"email"}
            required
            validations={{
              required: 'email is required',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message:
                  "Please enter a valid email EX: something@example.com",
              },
            }}
          />



          <Input
            register={register}
            errors={errors}
            title="Phone no."
            type="number"
            id={"phoneno"}
            required
            validations={{
              required: 'phone number is required',
              validate: {
                notAValidNo(val) {
                  return (
                    val.toString().length === 10 ||
                    "please enter a valid phone no"
                  );
                },
              },
            }}
          />

          <Input
            register={register}
            errors={errors}
            title="Location"
            type="select"
            id={"location"}
            required
            validations={{ required: "location is required", }}
            selectField={{
              title: "select location",
              options: location.map((el: any) => ({ id: el?.id, value: el?.location })),
            }}
          />

          <Input
            register={register}
            errors={errors}
            title="Password"
            type="password"
            id={"password"}
            required
            validations={{
              required: 'password is required',
              validate: {
                checkLength(val) {
                  return (
                    val.length >= 8 || "Password must atleast 8 char long"
                  );
                },
                checkNum(val) {
                  if (val.split("").some((el: string) => !isNaN(+el)))
                    return true;

                  return "Password should contain atleast one number";
                },
                checkSpecialCharacter(val) {
                  const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split(
                    ""
                  );

                  if (
                    val
                      .split("")
                      .some((el: string) => specialChar.includes(el))
                  )
                    return true;

                  return `Password should contain atleast one special character`;
                },
              },
            }}
          />


          <Input
            register={register}
            errors={errors}
            title="Status"
            type="select"
            id={"isactive"}
            required
            validations={{ required: "access is required", }}
            selectField={{
              title: "select access",
              options: [{ id: 'true', value: "Active" }, { id: 'false', value: "Deactivate" }],
            }}
          />

        </section>

        <div className='w-full bg-zinc-200 h-[1px] mt-3' />

        <div className='flex px-7 self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap'>
          <button
            onClick={onClose}
            className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize'
            type='button'>
            close
          </button>
          <button
            type='submit'
            disabled={submitting}
            className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
            {submitting ? 'saving..' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
