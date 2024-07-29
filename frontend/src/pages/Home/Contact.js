import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const {portfolioData} = useSelector(state => state.root)
  const {contact} = portfolioData;

  return (
    <div>
      <SectionTitle title="Say Hello" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map((key) => (
            key !== "_id" && (
              <p key={key} className="ml-5">
                <span className="text-tertiary">{key} : </span>
                <span className="text-tertiary">{contact[key]}</span>
              </p>
            )
          ))}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px]">
            <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            autoplay
            ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
