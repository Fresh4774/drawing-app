import { Center } from "./WelcomeScreen.Center";
import { MenuHint, HelpHint } from "./WelcomeScreen.Hints";

import "./WelcomeScreen.scss";

const WelcomeScreen = (props: { children?: React.ReactNode }) => {
  return (
    <>
      {props.children || (
        <>
          <Center />
          <MenuHint />
          <HelpHint />
        </>
      )}
    </>
  );
};

WelcomeScreen.displayName = "WelcomeScreen";

WelcomeScreen.Center = Center;
WelcomeScreen.Hints = { MenuHint, HelpHint };

export default WelcomeScreen;
