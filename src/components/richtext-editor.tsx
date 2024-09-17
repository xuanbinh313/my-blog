"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none prose-h1:font-light',
      },
    },
    content: "<h1>Hello World! 🌎️</h1>",
  });

  return <EditorContent editor={editor} />;
};

export default RichTextEditor;
