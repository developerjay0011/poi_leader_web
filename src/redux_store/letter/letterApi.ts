import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

// Add Letter API
export const getLetters = async (leaderId: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getLetters, { leaderId }));
      return res.data;
    }
  );
};

// Add Letter API
export const saveLetter =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveLetter, body);
        return res.data;
      }
    );
  }
// Delete Letter API
export const deleteLetter = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteLetter, { id, leaderid });
      return res.data;
    }
  );
};


// Add Letter Template API
export const getLetterTemplates = async (leaderId: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getLetterTemplates, { leaderId }));
      return res.data;
    }
  );
};

// Add Letter Template API
export const saveLetterTemplate =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveLetterTemplates, body);
        return res.data;
      }
    );
  }
// Delete Letter Template API
export const deleteLetterTemplates = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteLetterTemplates, { id, leaderid });
      return res.data;
    }
  );
};

