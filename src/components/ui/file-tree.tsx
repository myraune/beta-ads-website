import { useState } from "react";
import { cn } from "@/lib/utils";

/* A macOS Finder / code-editor style file explorer.
 * Adapted for the Beta Ads marketing site: uses the site theme tokens
 * (instead of bespoke file-tree-* tokens) and supports a custom `icon`,
 * an `id` + `active` state, and an `onSelect` callback so it can double as
 * a navigation tree. Folders toggle open/closed unless `locked`. */

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  extension?: string;
  /** Custom icon component (overrides the default file/folder glyph). */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional id passed to onSelect when this row is clicked. */
  id?: string;
  /** Selected/active row styling. */
  active?: boolean;
  /** Folder that can't be collapsed (stays open). */
  locked?: boolean;
}

interface FileTreeProps {
  data: FileNode[];
  className?: string;
  /** Header label next to the traffic lights. */
  label?: string;
  /** Called with the clicked node (use node.id to route). */
  onSelect?: (node: FileNode) => void;
}

const getFileIcon = (extension?: string) => {
  const iconMap: Record<string, { color: string; icon: string }> = {
    tsx: { color: "text-[#5ec8e8]", icon: "⚛" },
    ts: { color: "text-[#4a9eff]", icon: "◆" },
    css: { color: "text-[#a78bfa]", icon: "◈" },
    json: { color: "text-[#e3b341]", icon: "{}" },
    md: { color: "text-muted-foreground", icon: "◊" },
    default: { color: "text-muted-foreground", icon: "◇" },
  };
  return iconMap[extension || "default"] || iconMap.default;
};

function FileItem({
  node,
  depth,
  onSelect,
}: {
  node: FileNode;
  depth: number;
  onSelect?: (n: FileNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isFolder = node.type === "folder";
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const fileIcon = getFileIcon(node.extension);
  const Icon = node.icon;

  const handleClick = () => {
    if (isFolder && !node.locked) setIsOpen((o) => !o);
    if (node.id && onSelect) onSelect(node);
  };

  return (
    <div className="select-none">
      <div
        role="button"
        tabIndex={0}
        aria-current={node.active ? "true" : undefined}
        aria-expanded={isFolder && !node.locked ? isOpen : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          node.active
            ? "bg-primary/15 dark:bg-primary/20"
            : isHovered && "bg-muted/50 dark:bg-white/[0.06]"
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* Tree connector line */}
        {depth > 0 && (
          <div
            className="absolute top-0 bottom-0 flex"
            style={{ left: `${(depth - 1) * 16 + 16}px` }}
          >
            <div
              className={cn(
                "w-px transition-colors duration-200",
                node.active
                  ? "bg-primary/50"
                  : isHovered
                    ? "bg-primary/40"
                    : "bg-border/60 dark:bg-white/10"
              )}
            />
          </div>
        )}

        {/* Folder chevron (hidden placeholder for files keeps alignment) */}
        <div
          className={cn(
            "flex items-center justify-center w-3.5 h-3.5 shrink-0 transition-transform duration-200 ease-out",
            isFolder && isOpen && "rotate-90",
            !isFolder && "opacity-0"
          )}
        >
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            className={cn(
              "transition-colors duration-200",
              isHovered || node.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <path d="M1 1L5 4L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Icon: custom > folder > file */}
        <div
          className={cn(
            "flex items-center justify-center w-5 h-5 shrink-0 transition-all duration-200",
            node.active
              ? "text-primary"
              : isFolder
                ? isHovered
                  ? "text-primary"
                  : "text-primary/70"
                : Icon
                  ? isHovered
                    ? "text-foreground"
                    : "text-muted-foreground"
                  : isHovered
                    ? cn(fileIcon.color, "scale-110")
                    : cn(fileIcon.color, "opacity-80")
          )}
        >
          {Icon ? (
            <Icon className="w-4 h-4" />
          ) : isFolder ? (
            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
              <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" opacity="0.85">
              <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V14.5C0 15.3284 0.671573 16 1.5 16H12.5C13.3284 16 14 15.3284 14 14.5V4.5L9.5 0H1.5Z" />
              <path d="M9 0V4.5H14" fillOpacity="0.5" />
            </svg>
          )}
        </div>

        {/* Name */}
        <span
          className={cn(
            "font-mono text-[13px] leading-none transition-colors duration-200 truncate",
            node.active
              ? "text-foreground font-medium"
              : isFolder
                ? "text-foreground/90"
                : isHovered
                  ? "text-foreground"
                  : "text-muted-foreground"
          )}
        >
          {node.name}
        </span>

        {/* Active / hover dot */}
        <div
          className={cn(
            "absolute right-2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-200",
            node.active
              ? "opacity-100 scale-100"
              : isHovered
                ? "opacity-60 scale-100"
                : "opacity-0 scale-0"
          )}
        />
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isOpen ? "opacity-100" : "opacity-0 h-0"
          )}
          style={{ maxHeight: isOpen ? `${node.children!.length * 80}px` : "0px" }}
        >
          {node.children!.map((child) => (
            <FileItem key={child.name} node={child} depth={depth + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ data, className, label = "explorer", onSelect }: FileTreeProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 dark:border-white/[0.08] bg-card/70 dark:bg-[#0d0d12] p-2.5 font-mono shadow-sm",
        className
      )}
    >
      {/* Window header: traffic lights + label */}
      <div className="flex items-center gap-2 px-1 pb-2.5 mb-1.5 border-b border-border/40 dark:border-white/[0.07]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-muted-foreground ml-1">{label}</span>
      </div>

      {/* Tree */}
      <div className="space-y-0.5">
        {data.map((node) => (
          <FileItem key={node.name} node={node} depth={0} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
