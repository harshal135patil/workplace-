import React from "react";
import CommonTextArea from "../../common/ChatComponents/CommonTextArea";
function TextArea({ selectedLastMessage, allConversations, sendMessage,setMobileSidebaView }) {
  return selectedLastMessage ? (
    <CommonTextArea
      sendMessage={sendMessage}
      selectedLastMessage={selectedLastMessage}
      allConversations={allConversations}
      userType="employer"
      setMobileSidebaView={setMobileSidebaView}
    />
  ) : (
    <div className="no-message-selected">
      <h1>No message selected</h1>
    </div>
  );
}

export default TextArea;
