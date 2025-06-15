export function Button({ children, ...props }) {
  return (
    <button {...props} className={`transition-all ${props.className}`}>
      {children}
    </button>
  );
}