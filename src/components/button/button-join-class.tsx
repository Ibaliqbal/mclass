"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import { Input } from "../ui/input";

const ButtonJoinClass = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <Button className="w-full" onClick={() => setOpen(true)}>
        Join class
      </Button>
      <Modal open={open} setOpen={setOpen}>
        <motion.div
          initial={{ opacity: 0, translateY: 200 }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          exit={{
            opacity: 0,
            translateY: -200,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "tween",
          }}
          className="fixed w-[600px] pb-8 overflow-auto bg-black bg-opacity-80 h-fit flex flex-col gap-4 m-auto inset-0 z-[70] rounded-lg p-3 modal-post border border-gray-500"
        >
          <div className="pt-4 rounded-md flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Code Class</h2>
            <p>
              Mintalah kode kelas kepada pengajar, lalu masukkan kode di sini.
            </p>
            <Input
              type="text"
              className="w-[50%] mt-4 h-14"
              placeholder="Masukkan kode kelas"
            />
          </div>
          <Button className="mt-4">Gabung</Button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ButtonJoinClass;
