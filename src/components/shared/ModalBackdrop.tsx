import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

interface ModalBackdropProp {
  children: React.ReactNode;
}

const ModalBackdrop = ({ children }: ModalBackdropProp) => {
  const [searchParams] = useSearchParams();
  const prevBoardId = searchParams.get("board");
  const location = useLocation()
  const prevPath = location.state?.prevPath

  const avoidClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault()
  };

  return (
    <Link
      to={prevPath ? prevPath : prevBoardId ? `/?board=${prevBoardId}` : "/"}
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
    >
      <div onClick={avoidClick} className="cursor-default">{children}</div>
    </Link>
  );
};

export default ModalBackdrop;
