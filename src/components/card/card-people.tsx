import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  avatar: string;
  name: string;
};

const CardPeople = ({ avatar, name }: Props) => {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-gray-500">
      <Avatar className="w-12 h-12">
        <AvatarImage
          src={
            avatar
              ? avatar
              : `https://ui-avatars.com/api/?name=${name}&background=random&color=#000`
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
