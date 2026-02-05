"use client";
import { NotificationDrawer } from "@/components/notifications/notification-drawer";
import { useState } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggleNotificationDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <NotificationDrawer open={open} onOpenChange={toggleNotificationDrawer} />
      {children}
    </>
  );
};

export default Template;
