type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
      {label && <label style={{ fontSize: 14, color: "var(--text)" }}>{label}</label>}
      <input
        {...props}
        style={{
          padding: "10px 12px",
          border: "1px solid var(--border)",
          borderRadius: 6,
          fontSize: 15,
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
