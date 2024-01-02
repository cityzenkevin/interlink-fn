import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const tinyMceKey = import.meta.env.VITE_TINY_MCE_API_KEY;

interface Props {
  setValue: (value: string) => void;
  value: string;
}
export default function Edit({ setValue, value }: Props) {
  const editorRef = useRef<any>(null);

  return (
    <>
      <Editor
        apiKey={tinyMceKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        onEditorChange={(newValue, editor) => setValue(newValue)}
        value={value}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
