import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useThemeMode } from "../../theme/ThemeProvider";

export const ThemeToggle = ({ className = "" }) => {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  const Icon = isDark ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-text transition-colors hover:bg-sidebar-muted hover:text-white md:justify-center md:px-2 ${className}`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="md:hidden">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
};

export default ThemeToggle;
