import { tryCatch } from "@/config/try-catch";
import { ToastType } from "@/constants/common";
import { commonActions } from "@/redux_store/common/commonSlice";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { deleteDirectory, getDirectory } from "@/redux_store/directory/directoryApi";
import { directoryAction } from "@/redux_store/directory/directorySlice";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { ErrorTableRow } from "@/utils/ErrorTableRow";
import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

interface DirectoryTableProps {
  searchStr: string;
  isDirectory: boolean;
  editDirectory: any
}

export const DirectoryTable: FC<DirectoryTableProps> = ({
  searchStr,
  isDirectory,
  editDirectory
}) => {
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const { directory } = cusSelector((state) => state.directory);
  const dispatch = cusDispatch();
  const [deleteValue, setDeleteValue] = useState({ id: "", leaderid: "" });
  const filterDataOnDirectory = directory?.filter((el) =>
    searchStr ? el.name.includes(searchStr) : el
  );
  console.log(directory)
  const confirmDelete = (id: string, leaderid: string) => {
    setDeleteValue({
      id: id,
      leaderid: leaderid || "",
    });
    setShowConfirmBox(true);
  };

  const handleDelete = async () => {
    tryCatch(
      async () => {

        const response = await deleteDirectory(deleteValue?.id as string, deleteValue?.leaderid as string);
        if (response?.success) {
          onClose();
          const Data = await getDirectory(deleteValue?.leaderid as string);
          dispatch(directoryAction.storedirectory(Data))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  };

  const onClose = () => {
    setShowConfirmBox(false);
  };

  return (
    <>
      <table className="w-full mt-5">
        <thead className="text-left">
          <tr className="bg-orange-500 text-orange-50">
            <th className="p-2 font-medium">S.No</th>
            <th className="p-2 font-medium">Name</th>
            <th className="p-2 font-medium">Phone No</th>
            <th className="p-2 font-medium">Email</th>
            <th className="p-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {filterDataOnDirectory.length > 0 ? (
            filterDataOnDirectory.map((directory: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{directory.name}</td>
                    <td className="p-2">{directory.mobile}</td>
                    <td className="p-2">{directory.email}</td>
                    <td className="p-2 flex  gap-3">
                      <button
                        className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
                        onClick={() => editDirectory(directory)}
                      >
                        <FaEdit className="text-xl" />
                      </button>

                      <button
                        onClick={() =>
                          confirmDelete(directory.id, directory.leaderid)
                        }
                        className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
                      >
                        <BsTrash3Fill />
                      </button>

                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <ErrorTableRow colNo={5} />
          )}
        </tbody>
      </table>
      <AnimatePresence mode="wait">
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={false}
            onCancel={() => {
              setShowConfirmBox(false);
              onClose();
            }}
            onOk={() => handleDelete()}
          />
        )}
      </AnimatePresence>
    </>
  );
};
