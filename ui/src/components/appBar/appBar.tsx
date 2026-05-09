import clsx from "clsx";
import { MButton } from "../button";
import "./index.scss";
import type {
  MAppBarProps,
  MSearchAppBarProps,
  MSmallAppBarProps,
  MMediumAppBarProps,
} from "./interface";

export default function MAppBar({ variant = "search", ...rest }: MAppBarProps) {
  if (variant === "search") {
    return <MSearchAppBar {...rest} />;
  } else if (variant === "small") {
    return <MSmallAppBar {...rest} />;
  } else if (variant === "medium" || variant === "large") {
    return <MMediumAppBar {...rest} />;
  }
}

function MSearchAppBar({ ...rest }: MSearchAppBarProps) {
  return (
    <div className="mdui-app-bar">
      <div className="mdui-app-bar__content">
        <MButton
          variant="icon"
          size="sm"
        >
          <span className="material-icons">menu</span>
        </MButton>
        <MButton
          size="md"
          className="mdui-app-bar__search"
          onClick={rest.onSearch}
        >
          {rest.search}
        </MButton>
        {rest.children}
      </div>
    </div>
  );
}

function MSmallAppBar({ ...rest }: MSmallAppBarProps) {
  return (
    <div className="mdui-app-bar">
      <div className="mdui-app-bar__content">
        <MButton
          variant="icon"
          size="sm"
        >
          <span className="material-icons">menu</span>
        </MButton>
        <span
          className={clsx("mdui-app-bar__title", {
            center: rest.centerTitle,
          })}
        >
          <div
            className={clsx("mdui-app-bar__title-text", {
              "with-subtitle": !!rest.subtitle,
            })}
          >
            {rest.title}
            <div className="mdui-app-bar__subtitle">{rest.subtitle}</div>
          </div>
        </span>
        {rest.children}
      </div>
    </div>
  );
}

function MMediumAppBar({ offset = 0, ...rest }: MMediumAppBarProps) {
  if (offset > 56) {
    offset = 56;
  }

  return (
    <div
      className="mdui-app-bar"
      style={{
        height: 112 - offset,
        gap: 8,
      }}
    >
      <div
        className="mdui-app-bar__content"
        style={{
          height: 56,
        }}
      >
        <MButton
          variant="icon"
          size="sm"
        >
          <span className="material-icons">menu</span>
        </MButton>
        <span
          className={clsx("mdui-app-bar__title", {
            center: rest.centerTitle,
          })}
        >
          <div
            className={clsx("mdui-app-bar__title-text", {
              "with-subtitle": !!rest.subtitle,
            })}
            style={{
              opacity: offset / 56,
            }}
          >
            {rest.title}
            <div className="mdui-app-bar__subtitle">{rest.subtitle}</div>
          </div>
        </span>
        {rest.children}
      </div>
      <div
        className="mdui-app-bar__footer"
        style={{
          transform: `translateY(-${offset}px)`,
        }}
      >
        <span
          className={clsx("mdui-app-bar__title", {
            center: rest.centerTitle,
          })}
        >
          <div
            className={clsx("mdui-app-bar__title-text", {
              "with-subtitle": !!rest.subtitle,
            })}
          >
            {rest.title}
            <div className="mdui-app-bar__subtitle">{rest.subtitle}</div>
          </div>
        </span>
      </div>
    </div>
  );
}
