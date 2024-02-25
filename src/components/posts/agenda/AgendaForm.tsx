import React, { useEffect, useState } from "react";
import { Input } from "../../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getAgenda, saveAgenda } from "@/redux_store/agenda/agendaApi";
import moment from "moment";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";

interface AgendaFormProps {
  onCancel: () => void; // Define the type of onCancel prop
}

const AgendaForm: React.FC<AgendaFormProps> = ({ onCancel }) => {
  const [priority, setPriority] = useState("");
  const [access, setAccess] = useState("");
  const { categories } = cusSelector((st) => st.agenda);
  const [categoryFilter, setCategoryFilter] = useState("");
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>();

  const formSubmitHandler = async (data: UserDetails) => {
   
    const body: any = { ...data, categoryid:categoryFilter, access, priority, saved_by_type: userDetails?.usertype, saved_by: userDetails?.id, creation_date: moment(data.creation_date).format('YYYY-MM-DD hh:mm:ss'),leaderid:leaderProfile.id}
     try {
       const response = await saveAgenda(body);  
       if (response?.success) {
         const agendaData = await getAgenda(leaderProfile?.id as string);
         dispatch(agendaAction.storeAgendas(agendaData))
         onCancel()
         dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
       } else {
         dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
       }
     
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-x-4 gap-y-5"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="flex items-center justify-center gap-5">
          <Input
            errors={errors}
            id="title"
            placeholder="title"
            register={register}
            title="title"
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
            title="description"
            type="text"
            required
            validations={{
              required: "description is required",
            }}
          />
        </div>

        <div className="flex items-center justify-center gap-5">
          {/* <Input
            errors={errors}
            id="documents"
            placeholder="documents"
            register={register}
            title="documents"
            type="text"
            required
            validations={{
              required: "documents is required",
            }}
          /> */}
          <Input
            errors={errors}
            id="attachments"
            placeholder="attachments"
            register={register}
            title="attachments"
            type="file"
            required
            validations={{
              required: "attachments is required",
            }}
          />
          <Input
            errors={errors}
            id='creation_date'
            register={register}
            title='Creation Date'
            type='date'
            required
            validations={{
              required: 'Date of Birth is required',
            }}
          />
        </div>
        
        {/* <Input
          errors={errors}
          register={register}
          validations={{ required: 'State is required' }}
          id='category'
          title='Category'
          type='select'
          required
          selectField={{
            title: 'select cartegory',
            options: categories.map((el) => ({
              id: el.id,
              value: el.category,
            })),
          }}
        />
         */}
       
      {/* <label className="flex gap-1 items-center" htmlFor="category">
        <span className='font-semibold'>
            Category  <strong className='text-red-500'>*</strong>
          </span>
             </label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full capitalize num_inp text-base py-2 px-3 rounded-md outline-none border"
          >
            <option value="">All</option>
            {categories?.map((el) => (
              <option key={el.id} value={el.id}>
                {el.category}
              </option>
            ))}
          </select>
    */}
      
        <div className="flex items-center justify-center gap-5">
          <label className="flex gap-2 items-center" htmlFor="category">
            <span className="font-medium">Category</span>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
            >
              <option value="">All</option>
              {categories?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex gap-2 items-center" htmlFor="priority">
            <span className="font-medium">Priority</span>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
            >
              <option value="high">high</option>
              <option value="moderate">moderate</option>
              <option value="low">low</option>
            </select>
          </label>

          <label className="flex gap-2 items-center" htmlFor="priority">
            <span className="font-medium">Access</span>
            <select
              id="access"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
            >
              <option value="open">Open To All</option>
              <option value="followers">Followers</option>
            </select>
          </label>

          {/* <label className="flex gap-2 items-center" htmlFor="priority">
            <span className="font-medium">status</span>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
            >
              <option value="0">completed</option>
              <option value="1">in progress</option>
              <option value="2">not started yet</option>
            </select>
          </label> */}
        </div>

        <div className="flex justify-end col-span-full gap-2 mt-5">
          <button
            className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
            onClick={() => onCancel()}
          >
            close
          </button>
          <button
            className="rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgendaForm;
