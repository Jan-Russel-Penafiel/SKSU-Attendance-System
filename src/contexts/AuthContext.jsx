import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(idNumber, email, password) {
    try {
      console.log("Creating user account with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User account created, now creating Firestore document with ID:", idNumber);
      
      // Create user document in Firestore
      const userData = {
        idNumber,
        email,
        role: (email === "admin@gmail.com" && password === "admin") ? "admin" : "student",
        createdAt: new Date(),
      };
      
      console.log("User data to save:", userData);
      
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      console.log("User document created successfully");
      
      return userCredential;
    } catch (error) {
      console.error("Error in signup:", error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if this is our predefined admin account
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        
        // If user has email admin@gmail.com and password is admin, ensure they have admin role
        if (email === "admin@gmail.com" && password === "admin" && userData.role !== "admin") {
          await updateDoc(userRef, {
            role: "admin"
          });
          console.log("User promoted to admin automatically");
        }
      }
      
      return userCredential;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  async function getUserRole() {
    if (!currentUser) return null;
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().role;
    }
    return null;
  }

  async function getUserData() {
    if (!currentUser) return null;
    try {
      console.log("Getting user data for:", currentUser.uid);
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User data found:", userData);
        return userData;
      } else {
        console.log("No user data found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserRole,
    getUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 