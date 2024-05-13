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
