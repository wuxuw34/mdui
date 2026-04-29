import React, { useEffect, useRef, useState } from "react";
import type { MSnackbarConfig } from "./interface";
import { MSnackbarContext } from "./context";
import "./index.scss";
import clsx from "clsx";
import { MButton } from "../button";
import { createPortal } from "react-dom";

interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  text: string;
  action: React.ReactNode;
  handleOpenChange: (open: boolean) => void;
  showClose: boolean;
}

const SnackBar = ({
  open,
  text,
  action,
  handleOpenChange,
  showClose,
}: SnackbarProps) => {
  return (
    <div
      className={clsx("mdui-snackbar", {
        open,
      })}
      style={
        {
          "--offset": "10px",
        } as React.CSSProperties
      }
    >
      <div className="mdui-snackbar__content">{text}</div>
      <div className="mdui-snackbar__action">{action}</div>
      {showClose && (
        <div className="mdui-snackbar__close">
          <MButton
            variant="icon"
            size="xs"
            onClick={() => handleOpenChange(false)}
          >
            <span className="material-icons">close</span>
          </MButton>
        </div>
      )}
    </div>
  );
};

export default function MSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const listeners = useRef<Set<(open: boolean) => void>>(new Set());
  const [currentConfig, setCurrentConfig] = useState<MSnackbarConfig>({
    open: false,
    text: "",
    duration: 1000,
    showClose: true,
  });
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const openTimeRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = (open: boolean = false) => {
    setCurrentConfig((pre) => {
      return {
        ...pre,
        open,
      };
    });
    listeners.current.forEach((fn) => fn(open));
  };

  useEffect(() => {
    if (
      currentConfig.open &&
      typeof currentConfig.duration === "number" &&
      currentConfig.duration !== 0
    ) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
      timeRef.current = setTimeout(() => {
        handleOpenChange(false);
      }, currentConfig.duration);
    }
  }, [currentConfig]);

  return (
    <MSnackbarContext.Provider
      value={{
        open(config: MSnackbarConfig) {
          if (currentConfig.open && config.open) {
            // 需要先关闭
            setCurrentConfig((pre) => {
              return {
                ...pre,
                ...config,
                open: false,
              };
            });
            if (openTimeRef.current) {
              clearTimeout(openTimeRef.current);
              openTimeRef.current = null;
            }
            openTimeRef.current = setTimeout(() => {
              handleOpenChange(true);
            }, 100);
            return;
          }
          setCurrentConfig((pre) => {
            return {
              ...pre,
              ...config,
            };
          });
        },
        close() {
          handleOpenChange(false);
        },
        onOpenChange(fn) {
          listeners.current.add(fn);
          return () => {
            listeners.current.delete(fn);
          };
        },
      }}
    >
      {children}
      {createPortal(
        <SnackBar
          action={currentConfig.action}
          open={!!currentConfig.open}
          text={currentConfig.text}
          showClose={!!currentConfig.showClose}
          handleOpenChange={handleOpenChange}
        />,
        document.body,
      )}
    </MSnackbarContext.Provider>
  );
}
