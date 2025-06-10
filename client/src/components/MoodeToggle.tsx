import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return theme === "dark" ? (
    <Button variant="ghost" onClick={() => setTheme("light")}>
      <SunIcon className="size-5" />
      Light
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : (
    <Button variant="ghost" onClick={() => setTheme("dark")}>
      <MoonIcon className="size-5" />
      Dark
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
