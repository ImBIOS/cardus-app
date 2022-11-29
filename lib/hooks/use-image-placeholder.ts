import { useCallback, useMemo } from "react";

const useImagePlaceholder = () => {
  const triplet = useCallback((e1: number, e2: number, e3: number) => {
    const keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    return (
      keyStr.charAt(e1 >> 2) +
      keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
      keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
      keyStr.charAt(e3 & 63)
    );
  }, []);

  const rgbDataURL = useCallback(
    (r: number, g: number, b: number) =>
      `data:image/gif;base64,R0lGODlhAQABAPAA${
        triplet(0, r, g) + triplet(b, 255, 255)
      }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`,
    [triplet]
  );

  const imagePlaceholder = useMemo(
    () => rgbDataURL(96, 165, 250),
    [rgbDataURL]
  );

  return imagePlaceholder;
};

export default useImagePlaceholder;
