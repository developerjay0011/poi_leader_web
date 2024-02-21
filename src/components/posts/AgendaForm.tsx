import React, { useEffect, useState } from "react";
import { Input } from "../Input";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { fetchSaveAgenda } from "../api/agendas";
import { UserData } from "@/utils/utility";

interface AgendaFormProps {
  onCancel: () => void; // Define the type of onCancel prop
}

const AgendaForm: React.FC<AgendaFormProps> = ({ onCancel }) => {
  const [priority, setPriority] = useState("");
  const [access, setAccess] = useState("");
  const [status, setStatus] = useState("");

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  console.log(userData);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>();
  console.log(priority);
  console.log(access);
  console.log(status);

  const formSubmitHandler = async (data: UserDetails) => {
    console.log(data);

    //  try {
    //   const currentDate = new Date().toISOString();
    // const formData = new FormData();

    // formData.append("id", userData?.id || "");
    // formData.append("leaderid", userData?.userId || "");
    // formData.append("categoryid", userData?.id || "");
    // formData.append("title", data?.title || "");
    // formData.append("description", data?.description || "");
    // formData.append("attachments", data?.attachments || "");
    // formData.append("priority", priority || "");
    // formData.append("access", access || "");
    // formData.append("creation_date", currentDate || "");
    // formData.append("saved_by_type", userData?.id || "");
    // formData.append("saved_by", userData?.id || "");
    // formData.append("deletedDocs", userData?.id || "");

    // const token = userData?.token;

    // //   const Data = await fetchSaveAgenda(formData, token);
    // } catch (error) {
    //     console.log(error);
        
    // }
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
        <Input
          errors={errors}
          register={register}
          validations={{ required: 'State is required' }}
          id='category'
          title='Category'
          type='select'
          required
          selectField={{
            title: 'select cartegory',
            options: ['ss','ss'].map((el) => ({
              id: el,
              value: el,
            })),
          }}
        />
        <div className="flex items-center justify-center gap-5">
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
            <span className="font-medium">access</span>
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
