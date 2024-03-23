import { Editor } from "@tinymce/tinymce-react";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import config from "../config/config";

const RTE = forwardRef(({ name, control, label, defaultValue = "" }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 dark:text-white">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={config.tinyApiKey}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
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
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help",
              content_style:
                "body { font-family: 'Helvetica',Arial , sans-serif; font-size: 14px;",
            }}
            onEditorChange={onChange}
            ref={ref} // Attach the ref to the Editor component
          />
        )}
      />
    </div>
  );
});

export default RTE;
