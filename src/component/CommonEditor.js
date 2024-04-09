import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import htmlEditButton from 'quill-html-edit-button';

const CommonEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    // Register the HTML Edit Button with Quill
    Quill.register('modules/htmlEditButton', htmlEditButton);

    const editor = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'html-edit'],
            ['clean']
          ]
        },
        htmlEditButton: {}
      }
    });

    // Set initial content if provided
    if (value) {
      editor.root.innerHTML = value;
    }

    // Listen for changes and update parent component
    editor.on('text-change', () => {
      const html = editor.root.innerHTML;
      setEditorValue(html); // Update the internal state
      if (onChange) {
        onChange(html); // Notify parent component about the change
      }
    });

    // Clean up
    return () => {
      editor.off('text-change');
    };
  }, [ ]);

  return <div id="editor-container" />;
};

export default CommonEditor;
