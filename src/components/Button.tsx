export interface ButtonProps {
  /**
   * The text label of the button.
   * @remarks
   * This value represents the text displayed on the button.
   */
  label: string;

  /**
   * The icon to display inside the button.
   * @remarks
   * This can be any React node, such as an SVG or an icon component.
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon relative to the label.
   * @default 'left'
   */
  iconPosition?: "left" | "right";

  /**
   * Background color variant of the button.
   * @default 'gray'
   * @remarks
   * Determines the background color of the button.
   */
  variant?: "gray" | "green" | "blue";

  /**
   * Click event handler.
   */
  onClick?: () => void;

  /**
   * Additional CSS classes for custom styling.
   */
  className?: string;

  /**
   * Button type attribute.
   * @default 'button'
   */
  type?: "button" | "submit" | "reset";
}

/**
 * Button component
 *
 * @param {ButtonProps} props - The properties for the button component.
 * @returns {JSX.Element} The rendered button component.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconPosition = "left",
  variant = "gray",
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded transition-colors duration-300 focus:outline-none";

  const variantStyles =
    variant === "green"
      ? "bg-green-500 hover:bg-green-600"
      : variant === "blue"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-500 hover:bg-gray-600";

  const textStyles = "text-white font-medium";

  const combinedStyles = `${baseStyles} ${variantStyles} ${textStyles} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
