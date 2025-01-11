import React, { useEffect, useState } from "react";
import { Input } from "../../Input";
import { useForm } from "react-hook-form";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getAgenda, saveAgenda } from "@/redux_store/agenda/agendaApi";
import moment from "moment";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { Savedby, ToastType } from "@/constants/common";
import { getImageUrl } from "@/config/get-image-url";

interface AgendaFormProps {
  onCancel: () => void; // Define the type of onCancel prop
  Agenda: any
}

interface AgendaFormsProps {
  priority: string,
  category: string,
  access: string,
  creation_date: string,
  title: string,
  description: string,
}
const AgendaForm: React.FC<AgendaFormProps> = ({ onCancel, Agenda }) => {
  const { categories } = cusSelector((st) => st.agenda);
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const { register, setValue, watch, formState: { errors }, handleSubmit, } = useForm<AgendaFormsProps>();
  const formSubmitHandler = async (data: AgendaFormsProps) => {
    const body: any = {
      id: Agenda?.id ? Agenda?.id : "" as string,
      ...data,
      categoryid: data?.category,
      access: data?.access,
      priority: data?.priority,
      ...Savedby(),
      creation_date: moment(data.creation_date).format('YYYY-MM-DD HH:mm:ss'),
      leaderid: userDetails?.leaderId,
    }
    try {
      const response = await saveAgenda(body);
      if (response?.success) {
        const agendaData = await getAgenda(userDetails?.leaderId as string);
        dispatch(agendaAction.storeAgendas(agendaData))
        onCancel()
        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
      }

    } catch (error) {
    }
  };

  useEffect(() => {
    if (Agenda?.id) {
      setValue('title', Agenda?.title)
      setValue('description', Agenda?.description)
      setValue('category', Agenda?.categoryid)
      setValue('attachments' as any, Agenda?.attachments)
      setValue('access', Agenda?.access)
      setValue('priority', Agenda?.priority)
      setValue('creation_date', moment(Agenda.creation_date).format('YYYY-MM-DD'))
    }
  }, []);



  return (
    <form className="grid grid-cols-1 gap-x-4 gap-y-5 px-7 py-5" onSubmit={handleSubmit(formSubmitHandler)}>
      <div className=" flex items-center justify-center gap-5">
        <Input
          errors={errors}
          id="title"
          placeholder="title"
          register={register as any}
          title="title"
          type="text"
          required
          validations={{
            required: "title is required",
          }}
        />
      </div>
      <Input
        errors={errors}
        id="description"
        placeholder="description"
        register={register as any}
        title="description"
        type="textarea"
        required
        fullWidth
        validations={{
          required: "description is required",
        }}
      />


      <div className="flex items-center justify-center gap-5">
        <Input
          errors={errors}
          id="attachments"
          placeholder="attachments"
          register={register as any}
          title="attachments"
          type="file"
          required={Agenda?.attachments?.length > 0 ? false : true}
          validations={{
            required: "attachments is required",
          }}
          multiple={true}
        />
        <Input
          errors={errors}
          id='creation_date'
          register={register as any}
          title='Creation Date'
          type='date'
          required
          validations={{
            required: 'Creation Dateth is required',
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-5">
        <Input
          errors={errors}
          id={"category" as any}
          selectField={{
            title: "Category",
            options: categories?.map((el) => ({ id: el?.id, value: el.category })),
          }}
          register={register as any}
          title="Category"
          type="select"
          required
          validations={{
            required: "Category is required",
          }}
        />

        <Input
          errors={errors}
          id={"priority" as any}
          selectField={{
            title: "select priority",
            options: [
              { id: "high", value: "high" },
              { id: "moderate", value: "moderate" },
              { id: "low", value: "low" },
            ],
          }}
          register={register as any}
          title="Priority"
          type="select"
          required
          validations={{
            required: "Priority is required",
          }}
        />


        <Input
          errors={errors}
          id="access"
          selectField={{
            title: "select Access",
            options: [
              { id: "open", value: "Open To All" },
              { id: "followers", value: "Followers" },
            ],
          }}
          register={register as any}
          title="Access"
          type="select"
          required
          validations={{
            required: "Access is required",
          }}
        />
      </div>

      {Agenda?.attachments?.map((el: any) => (
        <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
          {el.split('/').pop()}
        </a>
      ))}

      <div className='w-full bg-zinc-200 h-[1px]' />

      <div className="flex justify-end col-span-full gap-2">
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
  );
};

export default AgendaForm;
