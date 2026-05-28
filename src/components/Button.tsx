type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: "10px 16px",
        background: "var(--accent)",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontSize: 15,
        cursor: "pointer",
        marginTop: 8,
      }}
    >
      {children}
    </button>
  );
}
