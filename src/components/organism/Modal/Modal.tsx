import { ReactNode, useContext, useState } from "react";
import { motion } from "framer-motion";
import { FloatingButton } from "../Button";
import { userContext } from "@/context/UserProvider";
interface ModalProps {
  children?: ReactNode;

}

const Modal: React.FC<ModalProps> = ({ children}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const {selectCard}:any = useContext(userContext)
  return (
    <>
      <FloatingButton
        onClick={() => setIsShowModal(true)}
        position="bottom-right"
      >
        {selectCard ? "-" : "+"}
      </FloatingButton>
      {isShowModal && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bg-gray-200 border  text-white shadow-xl top-0 right-0 w-full max-w-sm h-screen p-5"
          >
            <button
              onClick={() => setIsShowModal((sideBar) => !sideBar)}
              className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </>
  );
};

export { Modal };
