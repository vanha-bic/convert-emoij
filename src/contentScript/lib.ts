
export const debounce = (func: any, delay: number) => {
  let debounceTimer: number;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
