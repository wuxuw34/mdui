import {  useRef, useState } from "react";
import { MSheetContext } from "./context";
import { createPortal } from "react-dom";
import type { MSheetConfig } from "./interface";
import MBottomSheet from "./bottom";
import { MOverlay } from "../overlay";
import MSideSheet from "./side";

export default function MSheetProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [currentSheet, setCurrentSheet] = useState<MSheetConfig>({});
  const listeners = useRef<Set<(show: boolean) => void>>(new Set());

  const show = (config: MSheetConfig) => {
    setCurrentSheet(pre=>{
      return {
        ...pre,
        ...config
      }
    })
  };

  const handleShowChange = (show: boolean) => {
    setCurrentSheet((pre) => {
      return {
        ...pre,
        show,
      };
    });
    listeners.current.forEach((fn) => {
      fn(show);
    });
  };

  return (
    <MSheetContext.Provider
      value={{
        showSheet: show,
        closeSheet() {
          handleShowChange(false);
        },
        onShowChange(fn) {
          listeners.current.add(fn);
          return () => {
            listeners.current.delete(fn);
          };
        },
      }}
    >
      {children}
      {createPortal(
        <MOverlay
          show={!!currentSheet.show}
          onClick={() => handleShowChange(false)}
        />,
        document.body,
      )}
      {createPortal(
        <>
          {currentSheet.variant === "bottom" ? (
            <MBottomSheet
              show={!!currentSheet.show}
              onShowChange={handleShowChange}
            >
              {currentSheet.content}
            </MBottomSheet>
          ) : (
            <MSideSheet
              show={!!currentSheet.show}
              onShowChange={handleShowChange}
              header={currentSheet.header}
              footer={currentSheet.footer}
            >
              {currentSheet.content}
            </MSideSheet>
          )}
        </>,
        document.body,
      )}
    </MSheetContext.Provider>
  );
}
