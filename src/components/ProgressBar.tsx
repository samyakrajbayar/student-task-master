import { cn } from "@/lib/utils";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-card/50 border border-border/50 rounded p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          PROGRESS STATUS
        </span>
        <span className="font-mono text-sm text-primary text-glow">
          {completed}/{total} COMPLETED
        </span>
      </div>
      <div className="h-2 bg-muted rounded overflow-hidden">
        <div
          className={cn(
            "h-full bg-primary transition-all duration-500 ease-out",
            percentage === 100 && "bg-success glow-success"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] text-muted-foreground">
          {percentage}% COMPLETE
        </span>
        {percentage === 100 && (
          <span className="font-mono text-[10px] text-success animate-pulse">
            ALL TASKS CLEARED
          </span>
        )}
      </div>
    </div>
  );
}
