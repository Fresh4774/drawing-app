import React from "react";
import { WelcomeScreen } from "../../packages/excalidraw/index";

export const AppWelcomeScreen: React.FC<{
  onCollabDialogOpen: () => any;
  isCollabEnabled: boolean;
}> = React.memo((props) => {
  return (
    <WelcomeScreen>
      <WelcomeScreen.Hints.HelpHint />
      <WelcomeScreen.Center>
        <WelcomeScreen.Center.Logo />
      </WelcomeScreen.Center>
    </WelcomeScreen>
  );
});
