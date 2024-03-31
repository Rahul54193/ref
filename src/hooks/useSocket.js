import socket from '@app/helper/socket';
import {useEffect, useState} from 'react';

const useSocket = ({updateNewMessage, chat_item}) => {
  useEffect(() => {
    console.log('Socket====', socket);
    function onConnect(so) {
      console.log('Socket Connected', so);
    }

    function onDisconnect() {
      console.log('Socket Disconnected');
    }
    function onNewMessage(msg) {
      if (msg && msg?.data) {
        console.log('Socket New Message', {newMsg: msg?.data, chat_item});
        if (
          msg?.data?.product_id == chat_item.product_id &&
          (chat_item.sender_id == msg?.data?.sender_id ||
            chat_item.sender_id == msg?.data?.receiver_id) &&
          (chat_item.user_id == msg?.data?.sender_id ||
            chat_item.user_id == msg?.data?.receiver_id)
        ) {
          console.log('IN THE NEW MESSAGE');
          updateNewMessage(msg?.data);
        }
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newmsg', onNewMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newmsg', onNewMessage);
    };
  }, []);
  return null;
};

export default useSocket;
