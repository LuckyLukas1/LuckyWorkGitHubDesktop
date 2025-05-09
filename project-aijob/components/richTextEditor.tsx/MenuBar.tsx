import { Editor } from "@tiptap/react";
import { Tooltip, TooltipProvider } from "../ui/tooltip";

interface iAppProps {
  editior: Editor | null;
}

export function MenuBar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip></Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
