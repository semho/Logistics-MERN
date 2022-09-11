import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import "./modalportal.css";

export default function ModalPortal() {
  const params = useParams();
  const recordId = params.id;
  const recordTab = params.tab;
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && ref.current?.contains(event.target)) {
        navigate("/settings/");
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  const node = document.getElementById("modal_root");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className="modal active" ref={ref}>
      <div
        className="modal__content active"
        onClick={(e) => e.stopPropagation()}
      >
        Запись № {recordId}
        ТипТаба {recordTab}
      </div>
    </div>,
    node
  );
}
