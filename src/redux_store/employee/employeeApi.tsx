import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { useDispatch } from 'react-redux';


export const GetEmployees = async (leaderid: string) => {
    return tryCatch(
        async () => {
            const res = await Axios.get(insertVariables(APIRoutes.GetEmployees, { leaderid }));
            return res.data;
        }
    );
};

export const AddEditEmployee = async (body: any) => {
    return tryCatch(
        async () => {
            console.log("AddEditEmployee", body)
            const res = await Axios.post(APIRoutes.AddEditEmployee, body);
            return res.data;
        }
    );
}

export const GetLeaderEmployeeTabAccess = async (body: any) => {
    return tryCatch(
        async () => {
            const res = await Axios.post(APIRoutes.GetLeaderEmployeeTabAccess, body);
            return res.data;
        }
    );
}

export const GetSingleEmployeeDetail = async (body: any) => {
    return tryCatch(
        async () => {
            const res = await Axios.post(APIRoutes.GetSingleEmployeeDetail, body);
            return res.data;
        }
    );
}

export const SavePermission = async (body: any) => {
    return tryCatch(
        async () => {
            const res = await Axios.post(APIRoutes.SavePermission, body);
            return res.data;
        }
    );
}

export const ChangeActiveStatus = async (body: any) => {
    return tryCatch(
        async () => {
            const res = await Axios.post(APIRoutes.ChangeActiveStatus, body);
            return res.data;
        }
    );
}
