import React from "react";

const MailTo = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;
  return (
   
    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target='#'>
      {children}
    </a>
  );
};

export default MailTo