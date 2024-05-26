import { getShortcutFromShortcutName } from "../../actions/shortcuts";
import { useI18n } from "../../i18n";
import {
  useExcalidrawSetAppState,
  useExcalidrawActionManager,
  useExcalidrawElements,
} from "../App";
import {
  boltIcon,
  ExportIcon,
  ExportImageIcon,
  HelpIcon,
  LoadIcon,
  save,
  TrashIcon,
  usersIcon,
} from "../icons";
import DropdownMenuItem from "../dropdownMenu/DropdownMenuItem";
import {
  actionClearCanvas,
  actionLoadScene,
  actionSaveToActiveFile,
  actionShortcuts,
} from "../../actions";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { activeConfirmDialogAtom } from "../ActiveConfirmDialog";
import { jotaiScope } from "../../jotai";
import { openConfirmModal } from "../OverwriteConfirm/OverwriteConfirmState";
import Trans from "../Trans";
import { trackEvent } from "../../analytics";

import "./DefaultItems.scss";

export const LoadScene = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const elements = useExcalidrawElements();

  if (!actionManager.isActionEnabled(actionLoadScene)) {
    return null;
  }

  const handleSelect = async () => {
    if (
      !elements.length ||
      (await openConfirmModal({
        title: t("overwriteConfirm.modal.loadFromFile.title"),
        actionLabel: t("overwriteConfirm.modal.loadFromFile.button"),
        color: "warning",
        description: (
          <Trans
            i18nKey="overwriteConfirm.modal.loadFromFile.description"
            bold={(text) => <strong>{text}</strong>}
            br={() => <br />}
          />
        ),
      }))
    ) {
      actionManager.executeAction(actionLoadScene);
    }
  };

  return (
    <DropdownMenuItem
      icon={LoadIcon}
      onSelect={handleSelect}
      data-testid="load-button"
      shortcut={getShortcutFromShortcutName("loadScene")}
      aria-label={t("buttons.load")}
    >
      {t("buttons.load")}
    </DropdownMenuItem>
  );
};
LoadScene.displayName = "LoadScene";

export const SaveToActiveFile = () => {
  const actionManager = useExcalidrawActionManager();

  if (!actionManager.isActionEnabled(actionSaveToActiveFile)) {
    return null;
  }

  return (
    <DropdownMenuItem
      shortcut={getShortcutFromShortcutName("saveScene")}
      data-testid="save-button"
      onSelect={() => actionManager.executeAction(actionSaveToActiveFile)}
      icon={save}
      aria-label={`${"Save to"}`}
    >{`${"Save to"}`}</DropdownMenuItem>
  );
};
SaveToActiveFile.displayName = "Save to";

export const SaveAsImage = () => {
  const setAppState = useExcalidrawSetAppState();
  return (
    <DropdownMenuItem
      icon={ExportImageIcon}
      data-testid="image-export-button"
      onSelect={() => setAppState({ openDialog: { name: "imageExport" } })}
      shortcut={getShortcutFromShortcutName("imageExport")}
      aria-label="Save"
    >
      Save
    </DropdownMenuItem>
  );
};
SaveAsImage.displayName = "Save";

export const CommandPalette = (opts?: { className?: string }) => {
  const setAppState = useExcalidrawSetAppState();
  return (
    <DropdownMenuItem
      icon={boltIcon}
      data-testid="command-palette-button"
      onSelect={() => {
        trackEvent("command_palette", "open", "menu");
        setAppState({ openDialog: { name: "commandPalette" } });
      }}
      shortcut={getShortcutFromShortcutName("commandPalette")}
      aria-label="Menu"
      className={opts?.className}
    >
      Menu
    </DropdownMenuItem>
  );
};
CommandPalette.displayName = "Menu";

export const Help = () => {
  const actionManager = useExcalidrawActionManager();

  return (
    <DropdownMenuItem
      data-testid="help-menu-item"
      icon={HelpIcon}
      onSelect={() => actionManager.executeAction(actionShortcuts)}
      shortcut="?"
      aria-label="Shortcuts"
    >
      Shortcuts
    </DropdownMenuItem>
  );
};
Help.displayName = "Shortcuts";

export const ClearCanvas = () => {
  const setActiveConfirmDialog = useSetAtom(
    activeConfirmDialogAtom,
    jotaiScope,
  );
  const actionManager = useExcalidrawActionManager();

  if (!actionManager.isActionEnabled(actionClearCanvas)) {
    return null;
  }

  return (
    <DropdownMenuItem
      icon={TrashIcon}
      onSelect={() => setActiveConfirmDialog("clearCanvas")}
      data-testid="clear-canvas-button"
      aria-label="Reset"
    >
      Reset
    </DropdownMenuItem>
  );
};
ClearCanvas.displayName = "Reset";

export const Export = () => {
  const setAppState = useExcalidrawSetAppState();
  return (
    <DropdownMenuItem
      icon={ExportIcon}
      onSelect={() => {
        setAppState({ openDialog: { name: "jsonExport" } });
      }}
      data-testid="json-export-button"
      aria-label="Save"
    >
      Save
    </DropdownMenuItem>
  );
};
Export.displayName = "Save";

export const LiveCollaborationTrigger = ({
  onSelect,
  isCollaborating,
}: {
  onSelect: () => void;
  isCollaborating: boolean;
}) => {
  return (
    <DropdownMenuItem
      data-testid="collab-button"
      icon={usersIcon}
      className={clsx({
        "active-collab": isCollaborating,
      })}
      onSelect={onSelect}
    >
      Live Collab
    </DropdownMenuItem>
  );
};

LiveCollaborationTrigger.displayName = "Live Collab";
