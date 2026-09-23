// src/components/UI/Button.jsx
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white shadow-md shadow-pink-200",
    secondary:
      "bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-200",
    danger: "bg-red-400 hover:bg-red-500 text-white shadow-md shadow-red-200",
    ghost: "hover:bg-pink-50 text-pink-600",
  };

  return (
    <button
      className={`font-bold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
