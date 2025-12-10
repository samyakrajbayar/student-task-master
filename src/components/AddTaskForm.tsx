import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Priority, Category } from "./TaskItem";

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority, category: Category) => void;
}

const priorities: { value: Priority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const categories: { value: Category; label: string }[] = [
  { value: "study", label: "Study" },
  { value: "project", label: "Project" },
  { value: "exam", label: "Exam" },
  { value: "general", label: "General" },
];

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority, category);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="> Enter new task..."
          className="flex-1 font-mono text-sm bg-input border-border/50 
                     placeholder:text-muted-foreground/50
                     focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 
                     glow-primary transition-all duration-300 font-mono"
        >
          <Plus className="w-4 h-4 mr-1" />
          ADD
        </Button>
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-mono text-xs bg-secondary border-border/50 
                         hover:border-primary/50 hover:bg-secondary/80"
            >
              Priority: {priority.toUpperCase()}
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border-border">
            {priorities.map((p) => (
              <DropdownMenuItem
                key={p.value}
                onClick={() => setPriority(p.value)}
                className="font-mono text-xs cursor-pointer hover:bg-accent"
              >
                {p.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="font-mono text-xs bg-secondary border-border/50 
                         hover:border-primary/50 hover:bg-secondary/80"
            >
              Category: {category.toUpperCase()}
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border-border">
            {categories.map((c) => (
              <DropdownMenuItem
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="font-mono text-xs cursor-pointer hover:bg-accent"
              >
                {c.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  );
}
