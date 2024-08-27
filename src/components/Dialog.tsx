/* eslint-disable react/display-name */
import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import React from "react";

const Dialog = React.forwardRef(
  (
    {
      children,
      message,
      onConfirm,
    }: {
      children: ReactNode;
      message: string;
      onConfirm: (p?: any) => void;
    },
    ref
  ) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        {/* @ts-ignore */}
        <AlertDialogContent aria-description={message} ref={ref}>
          <AlertDialogHeader>
            <AlertDialogTitle>{message}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default Dialog;
