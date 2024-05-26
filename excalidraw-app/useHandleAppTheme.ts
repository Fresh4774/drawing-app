import { atom, useAtom } from "jotai";
import { useEffect, useLayoutEffect, useState } from "react";
import { THEME } from "../packages/excalidraw";
import { EVENT } from "../packages/excalidraw/constants";
import type { Theme } from "../packages/excalidraw/element/types";
import { CODES, KEYS } from "../packages/excalidraw/keys";
import { STORAGE_KEYS } from "./app_constants";

export const appThemeAtom = atom<Theme | "system">(
  (localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_THEME) as
    | Theme
    | "system"
    | null) || THEME.DARK,
);

const getDarkThemeMediaQuery = (): MediaQueryList | undefined =>
  window.matchMedia?.("(prefers-color-scheme: dark)");

export const useHandleAppTheme = () => {
  const [appTheme, setAppTheme] = useAtom(appThemeAtom);
  const [editorTheme, setEditorTheme] = useState<Theme>(THEME.DARK);

  useEffect(() => {
    const mediaQuery = getDarkThemeMediaQuery();

    const handleChange = (e: MediaQueryListEvent) => {
      setEditorTheme(e.matches ? THEME.DARK : THEME.DARK);
    };

    if (appTheme === "system") {
      mediaQuery?.addEventListener("change", handleChange);
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (
        !event[KEYS.CTRL_OR_CMD] &&
        event.altKey &&
        event.shiftKey &&
        event.code === CODES.D
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setAppTheme(editorTheme === THEME.DARK ? THEME.DARK : THEME.DARK);
      }
    };

    document.addEventListener(EVENT.KEYDOWN, handleKeydown, { capture: true });

    return () => {
      mediaQuery?.removeEventListener("change", handleChange);
      document.removeEventListener(EVENT.KEYDOWN, handleKeydown, {
        capture: true,
      });
    };
  }, [appTheme, editorTheme, setAppTheme]);

  useLayoutEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCAL_STORAGE_THEME, appTheme);

    if (appTheme === "system") {
      setEditorTheme(
        getDarkThemeMediaQuery()?.matches ? THEME.DARK : THEME.DARK,
      );
    } else {
      setEditorTheme(appTheme);
    }
  }, [appTheme]);

  return { editorTheme };
};
