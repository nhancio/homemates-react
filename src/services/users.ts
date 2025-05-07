import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
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

export const createOrUpdateUser = async (userData: {
  email: string;
  name: string;
  userId: string;
}) => {
  try {
    // Check if user exists
    const usersRef = collection(db, 'u');
    const q = query(usersRef, where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Create new user
      const userRef = doc(db, 'u', userData.userId);
      await setDoc(userRef, {
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });
      return { isNewUser: true };
    } else {
      // Update last login
      const existingUser = querySnapshot.docs[0];
      await setDoc(doc(db, 'u', existingUser.id), {
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
      return { isNewUser: false };
    }
  } catch (error) {
    console.error('Error managing user:', error);
    throw error;
  }
};
