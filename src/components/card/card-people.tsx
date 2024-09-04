import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  avatar: string;
  name: string;
  withBorder: boolean;
};

const CardPeople = ({ avatar, name, withBorder }: Props) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        withBorder ? "pb-2 border-b border-gray-500" : ""
      }`}
    >
      <Avatar className="md:w-12 md:h-12 w-10 h-10">
        <AvatarImage
          src={
            avatar
              ? avatar
              : `https://ui-avatars.com/api/?name=${name}&background=random&color=#fff`
          }
          alt="Avatar"
          width={100}
          height={100}
          className="object-cover object-center rounded-full"
        />
      </Avatar>
      <h4>{name}</h4>
    </div>
  );
};

export default CardPeople;
