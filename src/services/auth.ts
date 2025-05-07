import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createOrUpdateUser } from './users';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Add additional scopes for profile info
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    // Create/Update user in 'u' collection
    const userResult = await createOrUpdateUser({
      email: result.user.email || '',
      name: result.user.displayName || '',
      userId: result.user.uid
    });

    // Get profile photo URL from Google Auth
    const photoURL = result.user.photoURL || '';

    return {
      user: {
        id: result.user.uid,
        name: result.user.displayName || '',
        email: result.user.email || '',
        photoURL: photoURL,
        isPremium: false
      },
      success: true,
      isNewUser: userResult.isNewUser
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false };
  }
};
