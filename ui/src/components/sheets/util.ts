import type { MSheetConfig } from "./interface";

type SheetFn = (config: MSheetConfig) => void


export class MSheetManager {

  private static instance: MSheetManager;
  private listeners: Set<SheetFn> = new Set();
  private currentSheet: MSheetConfig = {};


  constructor() {
    if (MSheetManager.instance) {
      return MSheetManager.instance
    }
    this.listeners = new Set()
    this.currentSheet = {}
    MSheetManager.instance = this
  }

  subscribe(fn: SheetFn): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  show(config: MSheetConfig) {
    this.currentSheet = {
      ...this.currentSheet,
      ...config,
    }
    this.notify()
  }

  close() {
    this.currentSheet = {}
    this.notify()
  }

  notify() {
    this.listeners.forEach(fn => fn(this.currentSheet))
  }

  static getInstance() {
    if (!MSheetManager.instance) {
      MSheetManager.instance = new MSheetManager()
    }
    return MSheetManager.instance
  }

}