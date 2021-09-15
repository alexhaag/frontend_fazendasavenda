import React, { useState } from "react";
import { useEffect } from "react";
import { storage, db, auth } from '../../services/firebase';
import styles from './styles.module.scss';

function Upload() {
  const usuario = auth.currentUser;
  const [fileUrl, setFileUrl] = useState(null);
  const [users, setUsers] = useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL())
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if (!username) { return }
    db.collection("users").doc(username).set({
      name: username,
      avatar: fileUrl
    })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection('users').get();
      setUsers(usersCollection.docs.map(doc => {
        return doc.data();
      }))
    }
    fetchUsers();
  }, [users])

  return (
    <div className={styles.container}>
      <div>{usuario}</div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>

      </form>
      <ul>
        {users.map(user => {
          return (
            <li key={user.name}>
              <img src={user.avatar} alt={user.name} width="100" height="100" />
              <p>{user.name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Upload;