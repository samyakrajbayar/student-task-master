import { Check, Trash2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type Priority = "low" | "medium" | "high";
export type Category = "study" | "project" | "exam" | "general";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

const priorityStyles: Record<Priority, string> = {
  low: "border-l-success/50",
  medium: "border-l-warning/50",
  high: "border-l-destructive/50",
};

const categoryLabels: Record<Category, string> = {
  study: "STUDY",
  project: "PROJECT",
  exam: "EXAM",
  general: "GENERAL",
};

export function TaskItem({ task, onToggle, onDelete, index }: TaskItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded",
        "border-l-2 transition-all duration-300 hover:bg-card hover:border-primary/30",
        "animate-slide-in",
        priorityStyles[task.priority],
        task.completed && "opacity-50"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border transition-all duration-200",
          task.completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground/50 hover:border-primary hover:glow-primary"
        )}
      >
        {task.completed && <Check className="w-full h-full p-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-mono text-sm truncate transition-all duration-200",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[10px] text-primary/70 uppercase tracking-wider">
            [{categoryLabels[task.category]}]
          </span>
          <Circle
            className={cn(
              "w-2 h-2 fill-current",
              task.priority === "high" && "text-destructive",
              task.priority === "medium" && "text-warning",
              task.priority === "low" && "text-success"
            )}
          />
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 text-muted-foreground opacity-0 group-hover:opacity-100 
                   hover:text-destructive transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
