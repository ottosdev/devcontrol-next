"use client";
import { TicketProps } from "@/app/dashboard/_components/ticket";
import { ModalTicket } from "@/components/modal";
import { createContext, useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

interface ModalContextProps {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketProps | undefined;
  setDetailTicket: (detail: TicketProps) => void;
}

export const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({ children }: ModalProviderProps) {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketProps>();

  function setDetailTicket(detail: TicketProps) {
    console.log(detail);
    setTicket(detail);
  }

  function handleModalVisible() {
    setVisible(!visible);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
}
