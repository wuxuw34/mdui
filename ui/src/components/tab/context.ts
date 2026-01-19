import { createContext } from "react";

export interface MTabsContextProps {
  active?: string;
  index?: number;
  toggle?: (value: string, width: number, el: HTMLElement, init?: boolean) => void;
  isInit?: boolean
}
export const MTabsContext = createContext<MTabsContextProps>({});
