import "./ExcalidrawLogo.scss";
import logo from "../../../public/logo.png";

interface LogoProps {
  withText?: boolean;
  style?: React.CSSProperties;
  isNotLink?: boolean;
}

export const ExcalidrawLogo = ({ style }: LogoProps) => {
  return (
    <div className="Center" style={style}>
      <img src={logo} className="Logo" alt="Aquin Logo" />
      Aquin Whiteboard
    </div>
  );
};
