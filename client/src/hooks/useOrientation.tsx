import { useEffect, useState } from "react";

const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    // Check the initial orientation
    checkOrientation();

    // Set up event listener to detect orientation change
    window.addEventListener("resize", checkOrientation);

    // Clean up the event listener
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isLandscape;
};

export default useOrientation;
