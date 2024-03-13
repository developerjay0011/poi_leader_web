import React, { useEffect } from "react";
import { Input } from "../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getAgenda, saveTimeLine } from "@/redux_store/agenda/agendaApi";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { getImageUrl } from "@/config/get-image-url";
import { tryCatch } from "@/config/try-catch";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType, statusticketOption } from "@/constants/common";
import { getTickets, saveTicketStatus } from "@/redux_store/ticket/ticketApi";
import { ticketActions } from "@/redux_store/ticket/ticketSlice";

interface TicketTineLineFormProps {
  onCancel: () => void;
  ticketdata: any// Define the type of onCancel prop
  isedit: boolean
  data: any
}

const TicketTineLineForm: React.FC<TicketTineLineFormProps> = ({ onCancel, ticketdata, isedit, data }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const id = data?.id
  const dispatch = cusDispatch(); const { register, setValue, watch, formState: { errors }, handleSubmit, } = useForm<UserDetails>();
  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("id", isedit ? id : "");
        formData.append("leaderid", userDetails?.leaderId || "");
        formData.append("ticketid", ticketdata?.ticketid || "");
        formData.append("category", ticketdata?.ticket_category || "");
        formData.append("status", data?.status || "");
        formData.append("description", data?.remark || "");
        if (data?.attachments?.length != 0) {
          for (let i = 0; i < data?.attachments?.length; i++) {
            const element = data?.attachments?.[i]
            formData.append("attachments", element)

          }
        }
        const response = await saveTicketStatus(formData);
        if (response?.success) {
          const ticketData = await getTickets(userDetails?.leaderId as string);
          dispatch(ticketActions.storeTicket(ticketData))
          onCancel()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  };
  useEffect(() => {
    if (isedit) {
      setValue('remark', data.description)
      setValue('status', data.status)
    }
  }, [])


  return (
    <form
      className="grid grid-cols-1 gap-x-4 gap-y-5 px-7 py-5"
      onSubmit={handleSubmit(formSubmitHandler)}
    >
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
          options: statusticketOption.map((el) => ({
            id: el.id,
            value: el.value,
          })),
        }}
      />
      <Input
        errors={errors}
        id="remark"
        placeholder="remark"
        register={register}
        title="Remark"
        type="text"
      />


      <Input
        errors={errors}
        id="attachments"
        placeholder="attachments"
        register={register}
        title="Attachments"
        type="file"
        required={!isedit}
        validations={{
          required: "attachments is required",
        }}
      />


      {isedit && data?.attachments?.map((el: any) => (
        <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
          {el.match(/[^/]+$/)[0]}
        </a>
      ))}

      <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
      <div className="flex justify-end col-span-full gap-2">
        <a
          className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
          onClick={() => onCancel()}
        >
          close
        </a>
        <button
          className="rounded-full px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TicketTineLineForm;
