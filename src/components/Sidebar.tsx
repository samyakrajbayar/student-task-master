import { BookOpen, FolderKanban, GraduationCap, LayoutGrid, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "./TaskItem";

interface SidebarProps {
  activeFilter: Category | "all";
  onFilterChange: (filter: Category | "all") => void;
  taskCounts: Record<Category | "all", number>;
}

const filters: { value: Category | "all"; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "ALL TASKS", icon: <LayoutGrid className="w-4 h-4" /> },
  { value: "study", label: "STUDY", icon: <BookOpen className="w-4 h-4" /> },
  { value: "project", label: "PROJECT", icon: <FolderKanban className="w-4 h-4" /> },
  { value: "exam", label: "EXAM", icon: <GraduationCap className="w-4 h-4" /> },
  { value: "general", label: "GENERAL", icon: <ListChecks className="w-4 h-4" /> },
];

export function Sidebar({ activeFilter, onFilterChange, taskCounts }: SidebarProps) {
  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="font-mono text-lg text-primary text-glow tracking-wider">
          TASK<sup className="text-xs">v2</sup>
        </h1>
        <p className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wide">
          STUDENT TASK ARCHIVE
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded font-mono text-xs",
              "transition-all duration-200 group",
              activeFilter === filter.value
                ? "bg-sidebar-accent text-primary glow-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-primary"
            )}
          >
            <span
              className={cn(
                "transition-colors duration-200",
                activeFilter === filter.value ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )}
            >
              {filter.icon}
            </span>
            <span className="flex-1 text-left tracking-wider">{filter.label}</span>
            <span
              className={cn(
                "font-mono text-[10px] px-1.5 py-0.5 rounded",
                activeFilter === filter.value
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {taskCounts[filter.value]}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <p className="font-mono text-[9px] text-muted-foreground tracking-wider">
          SYSTEM TIME: {new Date().toLocaleTimeString("en-US", { hour12: false })}
        </p>
        <p className="font-mono text-[9px] text-primary/50 mt-1">
          STATUS: ONLINE
        </p>
      </div>
    </aside>
  );
}
