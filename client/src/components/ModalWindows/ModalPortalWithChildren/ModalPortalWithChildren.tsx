import React from "react";
import ReactDOM from "react-dom";
import "./modalportalwithchildren.css";

interface IModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function ModalPortalWithChildren({
  active,
  setActive,
  children,
}: IModal) {
  const node = document.getElementById("modal_root");
  if (!node) return null;

  return ReactDOM.createPortal(
    <>
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
    </>,
    node
  );
}
