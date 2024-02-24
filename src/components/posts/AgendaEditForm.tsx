
import React, { useEffect, useState } from "react";
import { Input } from "../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getAgenda, editAgenda } from "@/redux_store/agenda/agendaApi";
import moment from "moment";
import { AgendaDetails, agendaAction } from "@/redux_store/agenda/agendaSlice";
import { FaFileAlt } from "react-icons/fa";
import { getImageUrl } from '@/config/get-image-url';
interface AgendaFormProps {
  onCancel: () => void; // Define the type of onCancel prop
  data:any
}

const AgendaEditForm: React.FC<AgendaFormProps> = ({ onCancel,data }) => {
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

  const formSubmitHandler = async (formdata: UserDetails) => {
   
    const body = { ...formdata, id: data?.id, categoryid: categoryFilter, access, priority, saved_by_type: userDetails?.usertype, saved_by: userDetails?.id, creation_date: moment(formdata.creation_date).format('YYYY-MM-DD hh:mm:ss'),leaderid:leaderProfile.id}
     try {
       const Data = await editAgenda(body);  
       if (Data?.success) {
         toast.success(() => (
           <p>
             {Data?.message}
           </p>
         ));
         const agendaData = await getAgenda(leaderProfile?.id as string);
         dispatch(agendaAction.storeAgendas(agendaData))
         onCancel()
       }
       console.log("Data", Data)
    } catch (error) {
        console.log(error);
        
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    setValue('title', data.title)
    setValue('description', data.description)
    setValue('creation_date', moment(data.creation_date).format('YYYY-MM-DD') )
    setCategoryFilter(data.categoryid)
    setPriority(data.priority)
    setAccess(data.access)
  },[]);
  
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
            title="Title"
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
        </div>

        <div className="flex items-center justify-center gap-5">
        
          <Input
            errors={errors}
            id="attachments"
            placeholder="attachments"
            register={register}
            title="Attachments"
            type="file"
        
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
        </div>
        {data?.attachments?.map((el:any) => (
          <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
            {el.split('/').pop()}
          </a>
        ))}

        <div className="flex justify-end col-span-full gap-2 mt-5">
          <a
            className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
            onClick={onCancel}
          >
            close
          </a>
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

export default AgendaEditForm;
