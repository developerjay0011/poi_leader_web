import React, { useState } from "react";
import { Input } from "../../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import moment from "moment";
import { developmentAction } from "@/redux_store/development/developmentSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { getDevelopment, saveDevelopment } from "@/redux_store/development/developmentApi";

interface DevelopmentFormProps {
  onCancel: () => void; // Define the type of onCancel prop
}

const DevelopmentForm: React.FC<DevelopmentFormProps> = ({ onCancel }) => {
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
       const response = await saveDevelopment(body);  
       if (response?.success) {
         const Data = await getDevelopment(leaderProfile?.id as string);
         dispatch(developmentAction.storeDevelopments(Data))
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
            id="development_title"
            placeholder="title"
            register={register}
            title="Development Title"
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
      
        <div className="flex items-center justify-center gap-5">
          <label className="flex gap-2 items-center" htmlFor="category">
            <span className="font-medium">Category</span>
            <select
              id="category"
              required
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

        <div className="flex justify-end col-span-full gap-2 mt-5">
          <a
            className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
            onClick={() => onCancel()}
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

export default DevelopmentForm;
