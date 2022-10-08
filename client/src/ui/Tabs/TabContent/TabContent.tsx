import React from "react";

interface ITabContentProps {
  contentElementJSX: JSX.Element;
}

export function TabContent({ contentElementJSX }: ITabContentProps) {
  return <div className="tabcontent">{contentElementJSX}</div>;
}
