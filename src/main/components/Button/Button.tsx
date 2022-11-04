import './Button.scss';

const STYLES = ["solid", "outline"];
const SIZES = ["small", "medium", "large"];
const BORDER_RADIUS = ["normal", "rounded-pill"];

interface Props {
  // type: "button" | "submit" | "reset";
  size: "small" | "medium" | "large";
  style: "solid" | "outline";
  borderRadius: "normal" | "rounded-pill";
  type?: string
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ( props ) => {
  const checkStyle = STYLES.includes( props.style ) && props.style;
  const checkSize = SIZES.includes( props.size ) && props.size;
  const checkBorderRadius = BORDER_RADIUS.includes( props.borderRadius ) && props.borderRadius;
  return (
    <button className={`${checkStyle} ${checkSize} ${checkBorderRadius}`} disabled={props.disabled} onClick={props.onClick} >
      {props.children}
    </button>
  );
};

export default Button;
