import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserData {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  company?: string;
  mobile?: string;
  preferences?: string[];
}

export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    
    const users: UserData[] = [];
    snapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        name: userData.name || '',
        email: userData.email || '',
        photoURL: userData.photoURL || '',
        company: userData.company,
        mobile: userData.mobile,
        preferences: userData.preferences
      });
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
