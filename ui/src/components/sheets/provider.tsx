import { useEffect, useRef, useState } from "react";
import { MSheetContext } from "./context";
import { MSheetManager } from "./util";
import { createPortal } from "react-dom";
import type { MSheetConfig } from "./interface";
import MBottomSheet from "./bottom";
import { MOverlay } from "../overlay";

export default function MSheetProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const sheetInstanceRef = useRef<MSheetManager>(MSheetManager.getInstance());
  const [currentSheet, setCurrentSheet] = useState<MSheetConfig>({});
  const listeners = useRef<Set<(show: boolean) => void>>(new Set());

  useEffect(() => {
    const unsubscribe = sheetInstanceRef.current.subscribe((config) => {
      setCurrentSheet({
        ...config,
      });
    });
    return unsubscribe;
  }, []);

  const show = (config: MSheetConfig) => {
    sheetInstanceRef.current.show(config);
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
      {createPortal(<MOverlay show={!!currentSheet.show} />, document.body)}
      {createPortal(
        <MBottomSheet
          show={!!currentSheet.show}
          onShowChange={handleShowChange}
        >
          {currentSheet.content}
        </MBottomSheet>,
        document.body,
      )}
    </MSheetContext.Provider>
  );
}
