type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" };

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn-primary ${className}`}>
      {children}
    </button>
  );
}
