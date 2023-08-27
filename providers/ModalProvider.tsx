"use client";
import { useState, useEffect } from "react";

import Modal from "@/components/Modal";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Test Modal"
      description="Test Description"
      isOpen
      onChange={() => {}}
    >
      Test Children
    </Modal>
  );
};

export default ModalProvider;
