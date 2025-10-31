import { createContext, useState, useContext, useEffect } from "react";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // User is signed in, get their custom data from Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser({ ...currentUser, ...userDoc.data() });
          } else {
            // If the user is authenticated but the Firestore doc doesn't exist yet
            // (e.g., right after Google sign-in), we should still set the basic user object.
            // This prevents the app from thinking the user is logged out.
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data from Firestore:", error);
          setUser(currentUser); // Fallback to basic user object on error
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Save additional user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName: additionalData.firstName,
      lastName: additionalData.lastName,
      gender: additionalData.gender,
      phone: additionalData.phone,
      location: additionalData.location,
    });
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      // Check if a document for this user already exists
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      let userData = {};

      if (!userDoc.exists()) {
        // If it doesn't exist, create one with basic info from Google
        userData = {
          firstName: user.displayName.split(" ")[0] || "",
          lastName: user.displayName.split(" ").slice(1).join(" ") || "",
        };
        await setDoc(userDocRef, userData);
      } else {
        userData = userDoc.data();
      }
      // Manually update the user state immediately after Google sign-in
      // to ensure the full user object is available right away. This is crucial.
      setUser({ ...user, ...userData });
      return result;
    });
  };

  const updateUserProfile = (user, profile) => {
    return updateProfile(user, profile);
  };

  const updateUserInformation = async (newData) => {
    if (!user) return;
    try {
      // Update Firestore document
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, newData);

      // Update Firebase Auth profile (for displayName)
      if (newData.firstName && newData.lastName) {
        await updateUserProfile(user, {
          displayName: `${newData.firstName} ${newData.lastName}`,
        });
      }

      // Update local user state
      setUser((prevUser) => ({ ...prevUser, ...newData }));
    } catch (error) {
      console.error("Error updating user information:", error);
      throw error;
    }
  };

  const uploadProfilePicture = async (file, user, setLoading) => {
    if (!user) return;
    const fileRef = ref(storage, `avatars/${user.uid}`);
    setLoading(true);
    try {
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      await updateUserProfile(user, { photoURL });
      // Manually update the user state to reflect the change immediately
      setUser((prevUser) => ({ ...prevUser, photoURL }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    signUp,
    login,
    signInWithGoogle,
    updateUserProfile,
    updateUserInformation,
    uploadProfilePicture,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
