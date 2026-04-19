import type { MTextFieldProps } from "./interface";
import "./index.scss";
import clsx from "clsx";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function MTextField({
  prefixIcon,
  suffixIcon,
  variant = "filled",
  label,
  value,
  onValueChange,
  multiLine,
  helperText,
  maxLength = 255,
  rows = 1,
  onChange,
  showCount,
  ...rest
}: MTextFieldProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const inputValue = isControlled ? value : uncontrolledValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback((element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = e.target.value;
      if (maxLength && nextValue.length > maxLength) {
        return;
      }
      onChange?.(e);
      onValueChange?.(nextValue);
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      if (e.target instanceof HTMLTextAreaElement) {
        resizeTextarea(e.target);
      }
    },
    [isControlled, onChange, onValueChange, resizeTextarea, maxLength],
  );

  useLayoutEffect(() => {
    if (multiLine && textareaRef.current) {
      resizeTextarea(textareaRef.current);
    }
  }, [inputValue, multiLine, resizeTextarea]);

  return (
    <div
      className={clsx({
        "mtui-textfield-container": true,
      })}
    >
      <div
        className={
          clsx({
            "mdui-textfield-content": true,
          }) +
          " " +
          variant
        }
      >
        {prefixIcon && (
          <div className="mdui-icon mtui-textfield-prefix-icon">
            {prefixIcon}
          </div>
        )}
        <div
          className={clsx({
            "mdui-textfield-input-container": true,
            "has-value": !!inputValue,
          })}
        >
          <div className="mdui-textfield-label-container">
            <span className="md-textfield-label">{label}</span>
            <span
              className={
                "md-textfield-label-floating" +
                (multiLine && rows > 1 ? "" : " single-line")
              }
            >
              {label}
            </span>
          </div>
          {multiLine ? (
            <textarea
              ref={textareaRef}
              className="mdui-textfield-input-content multi-line"
              value={inputValue ?? ""}
              onChange={handleChange}
              {...rest}
              placeholder=""
              rows={rows}
            />
          ) : (
            <input
              className="mdui-textfield-input-content "
              value={inputValue ?? ""}
              onChange={handleChange}
              {...rest}
              placeholder=""
            />
          )}
        </div>
        {suffixIcon && (
          <div className="mdui-icon mtui-textfield-suffix-icon">
            {suffixIcon}
          </div>
        )}
      </div>
      <div className="mtui-textfield-footer">
        <span className="mtui-textfield-helper-text">{helperText}</span>
        {showCount && (
          <span className="mdui-textfield-character-counter">
            {inputValue.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
