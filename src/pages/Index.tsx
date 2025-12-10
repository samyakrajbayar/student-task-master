import { useState, useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TaskItem, type Task, type Priority, type Category } from "@/components/TaskItem";
import { AddTaskForm } from "@/components/AddTaskForm";
import { ProgressBar } from "@/components/ProgressBar";
import { Terminal } from "lucide-react";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete Math Assignment - Chapter 5",
    completed: false,
    priority: "high",
    category: "study",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Review Physics Notes",
    completed: true,
    priority: "medium",
    category: "study",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Group Project: Research Phase",
    completed: false,
    priority: "high",
    category: "project",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Prepare for Chemistry Exam",
    completed: false,
    priority: "high",
    category: "exam",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Submit Library Books",
    completed: true,
    priority: "low",
    category: "general",
    createdAt: new Date(),
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((task) => task.category === activeFilter);
  }, [tasks, activeFilter]);

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      study: tasks.filter((t) => t.category === "study").length,
      project: tasks.filter((t) => t.category === "project").length,
      exam: tasks.filter((t) => t.category === "exam").length,
      general: tasks.filter((t) => t.category === "general").length,
    };
  }, [tasks]);

  const completedCount = useMemo(
    () => filteredTasks.filter((t) => t.completed).length,
    [filteredTasks]
  );

  const handleAddTask = (title: string, priority: Priority, category: Category) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      category,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskCounts={taskCounts}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" />
            <h2 className="font-mono text-sm text-foreground tracking-wider">
              {activeFilter === "all" ? "ALL TASKS" : activeFilter.toUpperCase()}
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground ml-auto">
              LAST SYNC: {new Date().toLocaleString("en-US", { hour12: false })}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Progress */}
          <ProgressBar completed={completedCount} total={filteredTasks.length} />

          {/* Add Task Form */}
          <div className="bg-card/30 border border-border/50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] text-primary tracking-wider">
                &gt; NEW_TASK_INPUT
              </span>
            </div>
            <AddTaskForm onAdd={handleAddTask} />
          </div>

          {/* Task List */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                ACTIVE_RECORDS: {filteredTasks.length}
              </span>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <p className="font-mono text-sm text-muted-foreground">
                  NO TASKS FOUND
                </p>
                <p className="font-mono text-[10px] text-muted-foreground/50 mt-2">
                  CREATE A NEW TASK TO BEGIN
                </p>
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-border/50">
          <p className="font-mono text-[9px] text-muted-foreground/50 text-center tracking-widest">
            TASK ARCHIVE v2.0 | STUDENT PRODUCTIVITY SYSTEM | {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
