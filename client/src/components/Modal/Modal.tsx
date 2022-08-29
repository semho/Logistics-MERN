import React from "react";
import "./modal.css";

interface IModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export function Modal({ active, setActive, children }: IModal) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
