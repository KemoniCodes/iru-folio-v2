import React, { useEffect } from "react";
import contact from "../../public/contact.jpeg";
import Image from "next/image";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `(function(h,b,s,n,i,p,e,t) {
        h._HB_ = h._HB_ || {};h._HB_.pid = i;;;;
        t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
        e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
    })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","5fb85402902329000db6b393");
`;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Image src={contact} width={500} height={500} alt="contact" className="w-screen h-[500px] object-cover relative -mx-[50vw] max-w-[100vw] left-1/2 -top-36"/>
      <h2 className="w-full mx-auto text-center lg:mb-16 mb-4 lg:mt-0 -mt-16">Contact Us</h2>
      <div className="hb-p-5fb85402902329000db6b393-5"></div>
      <Image
        height={1}
        width={1}
        src="https://www.honeybook.com/p.png?pid=5fb85402902329000db6b393"
        alt="form"
      />
    </>
  );
}
