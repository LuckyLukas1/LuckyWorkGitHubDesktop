"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLinkMenuItem({ jobUrl }: { jobUrl: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL kopierad till urklipp");
    } catch (err) {
      console.log(err);
      toast.error("Misslyckades med att kopiera till URL");
    }
  }
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4" />
      <span>Kopiera jobb URL</span>
    </DropdownMenuItem>
  );
}
