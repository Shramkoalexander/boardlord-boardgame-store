import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCUZTor5Pl8-fjZALK4xC97v70wpdMRTiA",
  authDomain: "board-lord-db.firebaseapp.com",
  databaseURL: "https://board-lord-db.firebaseio.com",
  projectId: "board-lord-db",
  storageBucket: "board-lord-db.appspot.com",
  messagingSenderId: "886772713004",
  appId: "1:886772713004:web:d302a0fd2aadd76815f389",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileDocument = async (userAuth, extraData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...extraData,
      });
    } catch (error) {
      console.error(`error adding user to database: ${error.message}`);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, obj);
  });

  return await batch.commit();
};

export const convertSnapshotToProperCollection = (snapshot) => {
  const convertedCollection = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return convertedCollection;
};

export const getUserCartRef = async (userId) => {
  const cartsRef = firestore.collection(`/carts`).where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const userCartRef = firestore.collection(`/carts`).doc();
    await userCartRef.set({ userId, cartItems: [] });
    return userCartRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const getUserFavoritesRef = async (userId) => {
  const usersFavoritesRef = firestore
    .collection(`/favorites`)
    .where("userId", "==", userId);
  const snapShot = await usersFavoritesRef.get();

  if (snapShot.empty) {
    const favoritesRef = firestore.collection(`/favorites`).doc();
    await favoritesRef.set({ userId, favoriteItems: [] });
    return favoritesRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const firebaseError = {
  userAlreadyExists: {
    code: "auth/email-already-in-use",
    message: "Пользователь с таким email уже зарегистрирован",
  },
  userDoesntExists: {
    code: "auth/user-not-found",
    message: "Пользователя с таким email не существует",
  },
  wrongPassword: {
    code: "auth/wrong-password",
    message: "Неверный пароль",
  },
};

export default firebase;
