import { useEffect } from 'react';

const KeyboardShortcuts = (quillRef) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!quillRef.current) return;
      
      const editor = quillRef.current.getEditor();
      const isCtrl = event.ctrlKey || event.metaKey;

      if (isCtrl) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            editor.format('header', 1); // Apply Header 1
            break;
          case '2':
            event.preventDefault();
            editor.format('header', 2); // Apply Header 2
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [quillRef]);
};

export default KeyboardShortcuts;
