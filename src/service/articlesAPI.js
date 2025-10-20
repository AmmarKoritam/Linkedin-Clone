import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "../firebase";
import store from "../redux/reducers/store";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function postArticlesAPI(payload) {
  if (payload.image) {
    // upload image to firebase storage
    const storageRef = ref(storage, `images/${payload.image.name}`);

    const uploadRef = uploadBytesResumable(storageRef, payload.image);

    uploadRef.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("upload is " + progress + "% done");
      },
      (error) => {
        alert(error.message);
      },
      async () => {
        // upload all propratry to database
        const downloadURL = await getDownloadURL(uploadRef.snapshot.ref);

        const collRef = collection(database, "articles");

        await addDoc(collRef, {
          actor: {
            data: payload.timestamp,
            description: payload.user.email,
            title: payload.user.displayName,
            image: payload.user.photoURL,
          },
          comments: 0,
          description: payload.description,
          shareImage: downloadURL,
          video: payload.video,
        });
      }
    );
  } else if (payload.video) {
    const collRef = collection(database, "articles");

    addDoc(collRef, {
      actor: {
        data: payload.timestamp,
        description: payload.user.email,
        title: payload.user.displayName,
        image: payload.user.photoURL,
      },
      comments: 0,
      description: payload.description,
      shareImage: payload.image,
      video: payload.video,
    });
  } else {
    const collRef = collection(database, "articles");

    addDoc(collRef, {
      actor: {
        data: payload.timestamp,
        description: payload.user.email,
        title: payload.user.displayName,
        image: payload.user.photoURL,
      },
      comments: 0,
      description: payload.description,
      shareImage: payload.image,
      video: payload.video,
    });
  }
}

// get Posts from firebase

export function getArticlesAPI() {
  let payload;

  const collRef = collection(database, "articles");

  const orderRef = query(collRef, orderBy("actor.data", "desc"));

  onSnapshot(orderRef, (snapshot) => {
    payload = snapshot.docs.map((doc) => doc.data());
    store.dispatch({ type: "get/articles", payload: payload });
  });
}
