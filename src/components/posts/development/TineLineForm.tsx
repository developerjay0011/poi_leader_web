import React, { useEffect } from "react";
import { Input } from "../../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getImageUrl } from "@/config/get-image-url";
import { tryCatch } from "@/config/try-catch";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { getDevelopment, saveDevelopmentTimeLine } from "@/redux_store/development/developmentApi";
import { developmentAction } from "@/redux_store/development/developmentSlice";

interface TimeLineFormProps {
  onCancel: () => void;
  developmentid: string
  isedit: boolean
  data: any
}

const TimeLineForm: React.FC<TimeLineFormProps> = ({ onCancel, developmentid, isedit, data }) => {

  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);
  const statusOption = [
    { id: 'completed', value: 'completed' },
    { id: 'in progress', value: 'in progress' },
  ]
  const id = data?.id
  const dispatch = cusDispatch();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>();
  const formSubmitHandler = async (data: UserDetails) => {
    const body: any = { ...data, leaderid: leaderProfile.id, developmentid: developmentid }
    if (isedit) {
      body.id = id
    }
    tryCatch(
      async () => {
        const response = await saveDevelopmentTimeLine(body);
        if (response?.success) {
          const agendaData = await getDevelopment(userDetails?.leaderId as string);
          dispatch(developmentAction.storeDevelopments(agendaData))
          onCancel()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  };
  useEffect(() => {
    if (isedit) {
      setValue('milestone', data.milestone)
      setValue('description', data.description)
      setValue('status', data.status)
    }
  }, [])
  return (
    <div>
      <form
        className="grid grid-cols-1 gap-x-4 gap-y-5"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <Input
          errors={errors}
          id="milestone"
          placeholder="milestone"
          register={register}
          title="Milestone"
          type="text"
          required
          validations={{
            required: "title is required",
          }}
        />
        <Input
          errors={errors}
          id="description"
          placeholder="description"
          register={register}
          title="Description"
          type="text"
          required
          validations={{
            required: "description is required",
          }}
        />


        <Input
          errors={errors}
          id="attachments"
          placeholder="attachments"
          register={register}
          title="Attachment"
          type="file"
          required={!isedit}
          validations={{
            required: "attachments is required",
          }}
          multiple={true}
        />

        <Input
          register={register}
          errors={errors}
          title={'Status'}
          type='select'
          id="status"
          required
          validations={{
            required: `status is required`,
          }}
          selectField={{
            title: 'select status',
            options: statusOption.map((el) => ({
              id: el.id,
              value: el.value,
            })),
          }}
        />
        {isedit && data?.attachments?.map((el: any) => (
          <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
            {el.match(/[^/]+$/)[0]}
          </a>
        ))}

        <div className="flex justify-end col-span-full gap-2 mt-5">
          <button
            className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
            onClick={() => onCancel()}
          >
            close
          </button>
          <button
            className="rounded-full px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeLineForm;
