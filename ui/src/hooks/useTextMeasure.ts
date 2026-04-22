import { useRef } from "react";
import { TextMeasure } from "../utils/textMeasure";


export default function useTextMeasure() {
  const measure = useRef<TextMeasure>(new TextMeasure());

  return measure
}