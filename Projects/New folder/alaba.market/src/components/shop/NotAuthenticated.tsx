import React from "react";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import Login from "../auth/Login";

const NotAuthenticated = () => {
  const { openModal } = useModalStore();
  return (
    <div className="flex flex-col h-full">
      <div className="text-lg text-gray-500">Oops... you are not LoggedIn!</div>
      <div className="flex-1">
        <img src="/Sign in-pana.svg" alt="" className="size-56 mx-auto" />
      </div>
      <Button label="SignIn" onClick={() => openModal(<Login />)} />
    </div>
  );
};

export default NotAuthenticated;
