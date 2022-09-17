import React from "react";
import { LinkItemInt } from "../../ts/interfaces";

interface Props {
  data: LinkItemInt[];
}

const MyLinksButtons: React.FC<Props> = ({ data }) => {
  return (
    <div className='btns-container'>
      {data.map((link: LinkItemInt) => {
        return (
          <a
            className='btn'
            target={"_blank"}
            key={link.id}
            href={link.url}
            rel='noreferrer'
          >
            {link.name}
          </a>
        );
      })}
    </div>
  );
};

export default MyLinksButtons;
