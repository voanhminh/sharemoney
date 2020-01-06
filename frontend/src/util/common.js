
export const getUrlParamValue = (url, key) => {
  let urlObject = new URL(url);
  return urlObject.searchParams.get(key);
}

export const loadDynamicScript = (urlSrc, libraryName, callback) => {
  const existingScript = document.getElementById(libraryName);

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = urlSrc; // URL for the third-party library being loaded.
    script.id = libraryName; // e.g., googleMaps or stripe
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};