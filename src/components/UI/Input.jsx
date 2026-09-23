// src/components/UI/Input.jsx
export default function Input({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-pauBrown mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none bg-white/80 transition-colors"
      />
    </div>
  );
}
