export const FuncUtils = {
  debounce(fn: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  throttle(fn: Function, interval: number) {
    let lastTime = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastTime >= interval) {
        fn(...args);
        lastTime = now;
      }
    };
  },
};
