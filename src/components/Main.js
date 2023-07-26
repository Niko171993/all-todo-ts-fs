import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Item from "./Item";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Main() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mainChecked, setMainChecked] = useState(false);
  const firestoreCollectionReference = collection(db, "list");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  //***USER WRITES TO A LIST TO DATABASE */

  //***END OF USER WRITES TO A LIST TO DATABASE */
  //*** LISTEN FOR USER AUTH CHANGE ***
  const handleUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const myUser = user.uid;
        setUserId(myUser);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  useEffect(() => {
    handleUser();
  }, []);

  //*** END OF USER AUTH CHANGE ***

  const getDocuments = async () => {
    try {
      let data = await getDocs(firestoreCollectionReference);
      data = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setList(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDocuments();
  }, []);
  useEffect(() => {
    console.log(list);
  }, [list]);
  const receiveChecked = (checked) => {
    setMainChecked(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && !isEditing && user) {
      const item = { id: uuidv4(), title: name, checked: mainChecked };
      setList((list) => [...list, item]);
      try {
        await addDoc(firestoreCollectionReference, item);
        getDocuments();
      } catch (err) {
        console.error(err);
      }
    } else if (name && isEditing && user) {
      const editedList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        } else {
          return item;
        }
      });
      setList(editedList);
      try {
        const editDoc = doc(db, "list", editID);
        await updateDoc(editDoc, { title: name });
        getDocuments();
        console.log("bye");
      } catch (err) {
        console.error(err);
      }
      setIsEditing(false);
      setEditID(null);
      setName("");
    } else if (!name && !isEditing && !user) {
      alert(`please write some input`);
    } else if (!user) {
      alert(`please sign in to use the app`);
    }
  };
  const handleDelete = async (id) => {
    const filtered = list.filter((item) => item.id !== id);
    setList(filtered);
    try {
      const itemDoc = doc(db, "list", id);
      await deleteDoc(itemDoc);
      getDocuments();
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (id) => {
    setEditID(id);
    setIsEditing(true);
    const item = list.find((item) => item.id === id);
    setName(item.title);
  };
  return (
    <div className="App">
      <section className="form-container">
        <form onSubmit={handleSubmit} className="main-form">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn main-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </form>
      </section>

      <section className="list">
        {list.map((item) => {
          return (
            <Item
              {...item}
              key={item.id}
              receivedChecked={receiveChecked}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              list={list}
              getDocuments={getDocuments}
              setList={setList}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Main;
