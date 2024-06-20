'use client'

import React, { useCallback, useState } from 'react'
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider';


function page() {
  const {sendMessage} = useSocket();
  const [message ,setMessage] = useState('');



  return (
    <div className={classes['chat-wrap']}>
      <div>
        <h1>All Messages will appear here</h1>
      </div>
      <div>
        <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className={classes['chat-intput']} placeholder='Message...' />
        <button onClick={()=>{
          sendMessage(message)
          setMessage('');
          }} className={classes['btn-elem']} >Send</button>
      </div>
    </div>
  )
}

export default page
