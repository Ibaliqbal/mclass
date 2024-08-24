import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { RiSendPlane2Line } from "react-icons/ri";

const FormClassComment = () => {
  return (
    <form className="grow flex gap-3">
      <Textarea
        placeholder="Tinggalkan komentar mu..."
        className="resize-none"
      />
      <Button variant="icon" className="text-start">
        <RiSendPlane2Line className="text-xl" />
      </Button>
    </form>
  );
};

export default FormClassComment;
