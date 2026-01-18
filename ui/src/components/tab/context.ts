import { createContext } from "react";

export interface MTabsContextProps {
  active?: string;
  index?: number;
  toggle?: (value: string,width:number,el: HTMLElement) => void;
}
export const MTabsContext = createContext<MTabsContextProps>({});
