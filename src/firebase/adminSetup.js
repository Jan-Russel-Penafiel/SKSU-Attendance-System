import { doc, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Use this function in console to promote a user to admin
// Example usage:
// import { promoteToAdmin } from './firebase/adminSetup';
// promoteToAdmin('user-uid-here');

export const promoteToAdmin = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: "admin"
    });
    console.log(`User ${userId} has been promoted to admin`);
    return true;
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    throw error;
  }
}; 