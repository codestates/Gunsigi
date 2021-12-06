export const stopScroll = () => {
  document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
};

export const stopScrollMypage = () => {
  document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    width: 100%;`;
};

export const clearStopScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.cssText = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};
