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
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left p-2 border text-center'>S.No</th>
            <th className='font-semibold text-left p-2 border text-center'>Name</th>
            <th className='font-semibold text-left p-2 border text-center'>Phone No</th>
            <th className='font-semibold text-left p-2 border text-center'>Email</th>
            <th className='font-semibold text-left p-2 border text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {filterDataOnDirectory.length > 0 ? (
            filterDataOnDirectory.map((directory: any, index: number) => {
              return (
                <>
                  <tr className={`bg-white border-b border-gray-300 transition-all`} key={index}>
                    <td className='font-semibold text-left p-2 border text-center'>{index + 1}</td>
                    <td className='font-semibold text-left p-2 border text-center'>{directory.name}</td>
                    <td className='font-semibold text-left p-2 border text-center'>{directory.mobile}</td>
                    <td className='font-semibold text-left p-2 border text-center'>{directory.email}</td>
                    <td className='text-center py-2 pl-2 border printHide gap-2 '>
                      <button
                        className='hover:scale-110 transition-all ease-out duration-200 active:scale-100 mr-2'
                        onClick={() => editDirectory(directory)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          confirmDelete(directory.id, directory.leaderid)
                        }
                        className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
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
      <AnimatePresence mode="wait" >
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
