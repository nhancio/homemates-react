import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface UserProfile {
  id: string;
  userEmail: string;
  userName: string;
  userPhoneNumber: string;
  age: number;
  gender: string;
  profession: string;
  preferences: string[];
}

export async function getUsers(): Promise<UserProfile[]> {
  try {
    // Check if user is authenticated
    if (!auth.currentUser) {
      throw new Error('Authentication required');
    }

    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log('Raw Firestore Response:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Processing user document:', { id: doc.id, data });
      
      return {
        id: doc.id,
        userEmail: data.userEmail || '',
        userName: data.userName || '',
        userPhoneNumber: data.userPhoneNumber || '',
        age: Number(data.age) || 0,
        gender: data.gender || '',
        profession: data.profession || '',
        preferences: data.preferences || []
      };
    });

    console.log('Processed users:', users);
    return users;

  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}
