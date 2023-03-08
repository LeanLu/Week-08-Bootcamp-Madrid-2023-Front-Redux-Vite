/* eslint-disable no-unused-vars */
import { SyntheticEvent } from "react";

import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyCCAEEdp1iC-fcQxaQLvBxH_hmogjjvqsw",
  authDomain: "social-network-challenge.firebaseapp.com",
  projectId: "social-network-challenge",
  storageBucket: "social-network-challenge.appspot.com",
  messagingSenderId: "93609149558",
  appId: "1:93609149558:web:4795cdcbe7801e20c98b57",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, "guitar.png");

export function App() {
  // Para recoger la picture:
  // let imgSRC;
  // const guitarImage = ref(storageRef, "guitar");
  // const getURL = async () => {
  //   imgSRC = await getDownloadURL(guitarImage);
  //   return imgSRC;
  // };

  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;

    const filePicture = (formNewUser[0] as HTMLInputElement).files?.item(0);

    if (!filePicture) throw new Error("No Picture");

    await uploadBytes(storageRef, filePicture);

    // Para descargar la picture:
    // getURL();
  };

  return (
    <div className="App">
      <h1>Social Network</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userImg">
          Picture:
          <input type="file" name="userImg" id="userImg" />
        </label>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
