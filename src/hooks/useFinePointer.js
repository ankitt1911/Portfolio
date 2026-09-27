import useMediaQuery from "./useMediaQuery";

// True for mouse / trackpad users; false on touch devices.
export default function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
