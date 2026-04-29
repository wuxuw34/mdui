

export function createSingleton<T>() {

  let instance: SingletonClass | null = null

  class SingletonClass {
    listeners: Set<(config: T) => void> = new Set();
    current: T | null = null;

    constructor() {
      if (instance) {
        return instance
      }
      this.listeners = new Set()
      this.current = null
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      instance = this
    }

    subscribe(fn: (config: T) => void): () => void {
      this.listeners.add(fn)
      return () => this.listeners.delete(fn)
    }

    open(config: T) {
      this.current = {
        ...this.current,
        ...config,
      }
      this.notify()
    }

    close() {
      this.current = null
      this.notify()
    }

    notify() {
      this.listeners.forEach(fn => this.current && fn(this.current))
    }

    static getInstance() {
      if (!instance) {
        instance = new SingletonClass()
      }
      return instance
    }
  }

  return SingletonClass
}