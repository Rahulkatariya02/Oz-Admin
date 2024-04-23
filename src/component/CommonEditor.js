import React, { useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";

const CommonEditor = ({ placeholder, value, onChange }) => {
  const [content, setContent] = useState(value || "");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      uploader: {
        insertImageAsBase64URI: true,
      },
      // buttons:
      // "source,bold,italic,underline,strikethrough,|,ul,ol,|,font,fontsize,|,image,table,link,|,align,undo,redo,|,eraser,brush,paragraph,indent,|,selectall,cut,copy,paste,|,hr,symbol,|,left,center,right,|,superscript,subscript,|,removeformat,formatBlock,|,about,fullscreen", // Added fullscreen button
    }),
    [placeholder]
  );
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onChange(newContent);
  };

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  return (
    <JoditEditor
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={handleEditorChange}
    />
  );
};

export default CommonEditor;
