/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function JobDescriptionEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden bg-card">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
