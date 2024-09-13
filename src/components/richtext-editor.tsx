// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Link
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

function RichtextEditor() {
  return (
    <div className="w-full bg-white text-black">
      <CKEditor
        onChange={(event, editor) => {
          console.log({ event, editor: editor.isReadOnly });
        }}
        
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "strikethrough",
              "subscript",
              "superscript",
              "code",
              "|",
              "link",
              "uploadImage",
              "blockQuote",
              "codeBlock",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
            ],
          },
          plugins: [
            Bold,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Undo,
            Heading,
            Link,
          ],
          initialData: "<p>Hello from CKEditor 5 in React!</p>",
        }}
      />
    </div>
  );
}

export default RichtextEditor;
