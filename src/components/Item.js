import React from "react";
import { useState, useEffect } from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";
const Item = ({
  id,
  title,
  checked: SKU,
  receivedChecked,
  handleDelete,
  handleEdit,
  list,
  getDocuments,
  setList,
}) => {
  const [checked, setChecked] = useState(SKU);
  // useEffect(() => {
  //   receivedChecked(checked);
  // }, [checked]);
  const handleChange = async () => {
    setChecked(!checked);
    const item = list.find((item) => item.id === id);
    const editedItem = { ...item, checked: checked };
    setList((list) => {
      return list.map((item) => {
        if (item.id === id) {
          return editedItem;
        } else {
          return item;
        }
      });
    });
    try {
      const editDoc = doc(db, "list", id);
      console.log(editDoc, "EDIT-DOC");
      await updateDoc(editDoc, { checked: !checked });
      getDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="item-container">
      <div className="item-title">{title}</div>
      <div className="item-btns">
        <button className="item-edit item-btn" onClick={() => handleEdit(id)}>
          edit
        </button>
        <button
          className="item-delete item-btn"
          onClick={() => handleDelete(id)}
        >
          delete
        </button>
        <input
          type="checkbox"
          id="check"
          className="item-check"
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </article>
  );
};

export default Item;
