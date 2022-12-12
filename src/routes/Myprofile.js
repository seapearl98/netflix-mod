import { isVisible } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService,db,storage } from '../fbase';
import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, query, onSnapshot,where,orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import '../styles/Myprofile.css'

function Myprofile({userInfo, Layout, setShow}) {
useEffect(()=>{
    setShow(false);
})

const onLogOutClick = () => {
    authService.signOut();
    Navigate("/"); // 홈으로 이동
  }
  //-------------------------------------------
  const [tweets, setTweets] = useState([]); 
  const [newDisplayName, setNewDisplayName] = useState(userInfo.displayName);
  const [newPhotoURL,setNewPhotoURL] = useState(userInfo.photoURL);

  const onFileChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {currentTarget: {result}} = finishedEvent;
      setNewPhotoURL(result);
    }
    reader.readAsDataURL(theFile)
  }

  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    let photoURL = "";
    if(userInfo.photoURL != newPhotoURL){
      const storageRef = ref(storage, `${userInfo.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, newPhotoURL, 'data_url');
      console.log(response)
      photoURL = await getDownloadURL(ref(storage, response.ref))
      await updateProfile(userInfo, {photoURL});
    }

    if(userInfo.displayName != newDisplayName){
      await updateProfile(userInfo, {displayName: newDisplayName});
    }
  }

  const onClearAttachment = () => setNewPhotoURL("")

  useEffect(() => {
    //getMyTweets();
    const q = query(collection(db, "tweets"),
    where("createId", "==", userInfo.uid),
    orderBy("createAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setTweets(newArray);
    });
  },[]);

  return (
    <div className='myprofile'>
      <h2>프로필 수정</h2>
      <p>프로필 사진과 닉네임을 추가해주세요.</p>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder=' 이름을 입력해주세요.' className='nameinput'/>
            <input type="submit" className='nameinput'/>
            <label htmlFor='attach-file'>
                <span>+사진</span>
            </label>
            <input type="file" accept='image/*' onChange={onFileChange} id='attach-file' style={{opacity:0}} className='fileinput'/>
            {newPhotoURL && (
            <div className='profileForm__newPhotoURL'>
            <img src={newPhotoURL} style={{backgroundImage: newPhotoURL}} />
            <div className='profileForm__clear' onClick={onClearAttachment}>
                <span>X</span>
            </div>
            </div>
            )}
        </form>
        <h3 onClick={onLogOutClick} style={{color:"wheat",cursor:"pointer"}}>로그아웃</h3>
    </div>
  )
}

export default Myprofile