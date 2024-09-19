"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

const h1 = cn("prose-h1:text-3xl prose-h1:font-medium");
const h2 = cn("prose-h2:text-2xl prose-h2:font-medium");
const h3 = cn("prose-h3:text-lg prose-h3:font-medium");

const base = "prose dark:prose-invert prose-base focus:outline-none max-w-none";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value="<h1>Hello World! 🌎️</h1>", onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: cn(base, h1, h2, h3),
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
};

export default RichTextEditor;
