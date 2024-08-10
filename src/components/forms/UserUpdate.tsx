import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwt-decode module

interface IAdmissionFormClient {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}

interface IAdmissionFormProf {
  userId: string;
  userIdInterview: string;
  userIdNote: string;
}

interface FormDataUpdateUser {
  id: string;
  numberOfUserIds: number;
  numberOfInterviews: number;
  numberOfUserNote: number;
  numberOfUserIdsClient: number;
  numberOfUserIdsInterClient: number;
  numberOfUserIdsNoteClient: number;
}

export const HandleUpdateUser = async (
  formDataUpdateUser: FormDataUpdateUser,
  setFormDataUpdateUser: React.Dispatch<React.SetStateAction<FormDataUpdateUser>>,
  setMessage: (message: string) => void
) => {
  const [userIdL, setUserIdL] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      console.log('User ID:', userId);
      setUserIdL(userId);
    }
  }, []);

  const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const [admissions, setAdmissions] = useState<IAdmissionFormProf[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormProf');
        const data = await response.json();
        setAdmissions(data);
      } catch (error) {
        console.error('Failed to fetch forms:', error);
      }
    };

    fetchForms();
  }, []);

  const [admissionsClient, setAdmissionsClient] = useState<IAdmissionFormClient[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/submitFormClient');
        const data = await response.json();
        setAdmissionsClient(data);
      } catch (error) {
        console.error('Failed to fetch forms:', error);
      }
    };

    fetchForms();
  }, []);

  const numberOfUserIds = admissions.filter(admission => admission.userId === userIdL).length;
  const numberOfInterviews = admissions.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserNote = admissions.filter(admission => admission.userIdNote === userIdL).length;

  const numberOfUserIdsClient = admissionsClient.filter(admission => admission.userId === userIdL).length;
  const numberOfUserIdsInterClient = admissionsClient.filter(admission => admission.userIdInterview === userIdL).length;
  const numberOfUserIdsNoteClient = admissionsClient.filter(admission => admission.userIdNote === userIdL).length;

  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('No authentication token found');
    return;
  }

  try {
    const response = await fetch('/api/user_update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: formDataUpdateUser.id,
        updateData: {
          numberOfUserIds,
          numberOfInterviews,
          numberOfUserNote,
          numberOfUserIdsClient,
          numberOfUserIdsInterClient,
          numberOfUserIdsNoteClient,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Updated Document:', data);
    setMessage(data.message);

    // Update formData with the response if needed
    setFormDataUpdateUser((prevState) => ({
      ...prevState,
      ...data.updatedFields, // Assuming the API returns the updated fields
    }));

    toast.success('Document updated successfully');
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to update document');
  }
};
