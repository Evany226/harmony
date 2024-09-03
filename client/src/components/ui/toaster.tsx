"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        image,
        createdAt,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center space-x-4 w-full">
              {image && (
                <Avatar>
                  <AvatarImage src={image.toString()} />
                  <AvatarFallback />
                </Avatar>
              )}
              <div className="w-full flex-col space-y-1">
                <div className="flex items-center justify-between w-full">
                  {title && <ToastTitle className="">{title}</ToastTitle>}
                  {createdAt && (
                    <p className="text-xs text-gray-400">{createdAt}</p>
                  )}
                </div>

                {description && (
                  <ToastDescription className="text-sm">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
