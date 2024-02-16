import {
  fetchDeleteDirectory,
  fetchGetDirectories,
} from "@/components/api/directory";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { ErrorTableRow } from "@/utils/ErrorTableRow";
import { UserData } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";

interface DirectoryTableProps {
  searchStr: string;
  isDirectory: boolean;
  editDirectory:any
}

export const DirectoryTable: FC<DirectoryTableProps> = ({
  searchStr,
  isDirectory,
  editDirectory
}) => {
  const [directoryData, setDirectoryData] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const [deleteData, setDeteleData] = useState({});

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  console.log(userData);
  console.log(directoryData);

  useEffect(() => {
    (async () => {
      try {
        if (userData && userData?.id?.length > 0) {
          const leaderid = userData?.id || "";
          const token = userData?.token || "";

          console.log(leaderid);
          console.log(leaderid?.length > 0);
          const data = await fetchGetDirectories(leaderid, token);
          console.log(data, "directory Data ");

          if (data?.length > 0) {
            setDirectoryData(data);
          } else {
            setDirectoryData(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData, deleteData, isDirectory]);
  const [deleteValue, setDeleteValue] = useState({});

  const confirmDelete = (id: string, leaderid: string) => {
    const DeleteDirectory = {
      id: id,
      leaderid: leaderid || "",
    };
    setDeleteValue(DeleteDirectory);
    setShowConfirmBox(true);
  };

  const handleDelete = async () => {
    try {
      const token = userData?.token || "";

      const res = await fetchDeleteDirectory(deleteValue, token);
      console.log(res);
      if (res.success) {
        setDeteleData(res);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
          {directoryData.length > 0 ? (
            directoryData.map((directory: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{directory.name}</td>
                    <td className="p-2">{directory.mobile}</td>
                    <td className="p-2">{directory.email}</td>
                    <td className="p-2 flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          confirmDelete(directory.id, directory.leaderid)
                        }
                      >
                        Delete
                      </button>
                      <button onClick={() => editDirectory(directory)}>Edit</button>
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
