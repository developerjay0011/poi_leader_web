import React, { useEffect } from "react";
import { Input } from "../../Input";
import { useForm } from "react-hook-form";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import moment from "moment";
import { developmentAction } from "@/redux_store/development/developmentSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { Savedby, ToastType } from "@/constants/common";
import { getDevelopment, saveDevelopment } from "@/redux_store/development/developmentApi";
import { getImageUrl } from "@/config/get-image-url";

interface DevelopmentFormProps {
  onCancel: () => void; // Define the type of onCancel prop
  development: any
}

interface AgendaFormsProps {
  priority: string,
  category: string,
  access: string,
  creation_date: string,
  title: string,
  description: string,
}
const DevelopmentForm: React.FC<DevelopmentFormProps> = ({ onCancel, development }) => {
  const dispatch = cusDispatch();
  const { categories } = cusSelector((st) => st.agenda);
  const { userDetails } = cusSelector((state) => state.auth);
  const { register, setValue, watch, formState: { errors }, handleSubmit, } = useForm<AgendaFormsProps>();

  const formSubmitHandler = async (data: AgendaFormsProps) => {
    const body: any = {
      ...data,
      id: development?.id ? development?.id : "" as string,
      leaderid: userDetails?.leaderId,
      categoryid: data?.category,
      access: data?.access,
      priority: data?.priority,
      development_title: data?.title,
      ...Savedby(),
      creation_date: moment(data.creation_date).format('YYYY-MM-DD HH:mm:ss'),
    }
    try {
      const response = await saveDevelopment(body);
      if (response?.success) {
        const Data = await getDevelopment(userDetails?.leaderId as string);
        dispatch(developmentAction.storeDevelopments(Data))
        onCancel()
        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
      }
    } catch (error) {
    }
  };



  useEffect(() => {
    if (development?.id) {
      setValue('title', development?.development_title)
      setValue('description', development?.description)
      setValue('category', development?.categoryid)
      setValue('attachments' as any, development?.attachments)
      setValue('access', development?.access)
      setValue('priority', development?.priority)
      setValue('creation_date', moment(development.creation_date).format('YYYY-MM-DD'))
    }
  }, []);

  return (
    <>
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
            required={development?.attachments?.length > 0 ? false : true}
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
              required: 'Creation Date is required',
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

        {development?.attachments?.map((el: any) => (
          <div className="flex col-span-full gap-2" >
            <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
              {el.split('/').pop()}
            </a>

          </div>
        ))}

        <div className='w-full bg-zinc-200 h-[1px]' />

        <div className="flex justify-end col-span-full gap-2">
          <button
            className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize "
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
    </>
  );
};

export default DevelopmentForm;
