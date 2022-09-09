import React from "react";

interface ITabContentProps {
  contentElementJSX: JSX.Element;
}

export default function TabContent({ contentElementJSX }: ITabContentProps) {
  return <div className="tabcontent">{contentElementJSX}</div>;
}
