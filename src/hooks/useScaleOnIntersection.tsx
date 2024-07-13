import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const useResizeOnIntersection = (index, currentIndex, setIndex) => {
  const ref = useRef(null);

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px 0px -50% 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setIndex(index);
    }
  }, [intersection, index, setIndex]);

  useGSAP(() => {
    if (index === currentIndex) {
      gsap.to(ref.current, { width: 480, height: 720, duration: 0.5 });
    } else {
      gsap.to(ref.current, { width: 400, height: 600, duration: 0.5 });
    }
  }, [index, currentIndex]);

  return ref;
};

export default useResizeOnIntersection;
