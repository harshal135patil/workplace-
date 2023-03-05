import React, { useContext, useEffect, useState } from "react";
import CommonLastMessage from "../../common/ChatComponents/CommonLastMessage";
import {userContext} from '../../../context/userContext'
import {query,collection,where, onSnapshot} from 'firebase/firestore'
import {db} from '../../../firebaseconfig'
function SideBar({ selectedLastMessage, selectedLastMessagefun }) {
  const [lastmessages, setLastmessages] = useState([
  ]);
  const [state,dispatch] = useContext(userContext);
  const fetchAllLastMessages = async () => {

    const employerId=state.user.email;
    const q =query(
      collection(db, "last_messages"),
      where("employerId", "==", employerId)
    )
   await onSnapshot(q,(querySnapshot)=>{
      const lastmessages = [];
      querySnapshot.forEach((doc)=>{
        lastmessages.push(doc.data());
      })
      console.log(lastmessages);
      setLastmessages(lastmessages);
   })
  }
  useEffect(() => {
    fetchAllLastMessages();
  }, []);
  return (
    <CommonLastMessage
      lastmessages={lastmessages}
      selectedLastMessage={selectedLastMessage}
      selectedLastMessagefun={selectedLastMessagefun}
      userType="employer"
    />
  );
}

export default SideBar;
