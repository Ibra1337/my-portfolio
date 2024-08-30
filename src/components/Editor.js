import React, { useState, useCallback, useRef, forwardRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css'; // Import your chosen Highlight.js theme
import hljs from 'highlight.js';
import '../index.css'; // Import your custom CSS file
import { uploadImage } from './utils/imageUpload'; 
import { fetchCodeSnippet } from './utils/gitUtils';
import { userManager } from '../sec/UserManager';
import { useNavigate } from 'react-router-dom';
import keyboardShortcuts from './utils/keyboardShortcouts'; // Import your custom hook

const Editor = forwardRef(({ value, onChange }, ref) => {
  const [content, setContent] = useState(value || '');
  const quillRef = useRef(null);
  const [token, setToken] = useState(null); // State for token
  const navigate = useNavigate(); // Add the useNavigate hook
  useEffect(() => {
    // Fetch the token from userManager
    const fetchToken = async () => {
        try {
            const user = await userManager.getUser(); // Await the promise
            if (user) {
                setToken(user.access_token);
                console.log("Access token1: " + user.access_token);
            } else {
                console.error('User not authenticated');
                navigate('/login'); // Redirect to login if user is not authenticated
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login'); // Handle the error (e.g., by redirecting to login)
        }
    };

    fetchToken(); // Call the async function
}, [navigate]); // Add navigate to the dependency array

  keyboardShortcuts(quillRef); // Use the custom hook

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops.forEach(op => {
          if (op.insert && typeof op.insert === 'string') {
            op.attributes = { 'code-block': true };
          }
        });
        return delta;
      });

      editor.on('text-change', () => {
        const elements = editor.container.getElementsByTagName('pre');
        for (let i = 0; i < elements.length; i++) {
          hljs.highlightBlock(elements[i]);
        }
      });
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const user = await userManager.getUser()
          const token = user.access_token
          const { url } = await uploadImage(file ,token);
          const quillEditor = quillRef.current.getEditor();
          const range = quillEditor.getSelection();
          quillEditor.insertEmbed(range.index, 'image', url);
        } catch (error) {
          console.error('Error during file upload:', error);
        }
      }
    };
  }, []);


const handleCodeSnippetInsert = useCallback(async () => {
  const rawUrl = prompt('Enter the GitHub raw file URL (e.g., https://raw.githubusercontent.com/user/repo/branch/path/to/file):');
  if (!rawUrl) {
    return;
  }

  // Convert the raw URL to a GitHub blob URL
  const blobUrl = rawUrl.replace('https://raw.githubusercontent.com/', 'https://github.com/')
                        .replace('/master/', '/blob/master/')
                        .replace('/main/', '/blob/master/')
                        .replace('/blob/main/', '/blob/master/')
                        .replace(/\/raw\/[a-zA-Z0-9-_]+\/$/, '/blob/master/'); // Handle ending in /raw/.../branch

  try {
    const code = await fetchCodeSnippet(rawUrl);
    const quillEditor = quillRef.current.getEditor();
    const range = quillEditor.getSelection();
    if (!range) {
      return; // Ensure there's a selection range
    }

    // Insert the code snippet
    quillEditor.insertText(range.index, code, 'code-block', true);

    // Add the GitHub URL directly after the code snippet
    const urlText = `View on GitHub: ${blobUrl}`;
    quillEditor.insertText(range.index + code.length, urlText, { link: blobUrl });

    // Optionally highlight the code block
    const block = quillEditor.container.getElementsByTagName('pre')[0];
    if (block) {
      hljs.highlightBlock(block);
    }

    // Move the cursor to the end of the inserted content
    quillEditor.setSelection(range.index + code.length + urlText.length + 1);
  } catch (error) {
    console.error('Error fetching code snippet:', error);
  }
}, []);
  

  const modules = {
    toolbar: {
      container: [
        [{ 'font': [] }, { 'header': '1' }, { 'header': '2' }],
        [{ 'size': ['small', 'medium', 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'code-block': 'code' }], 
        ['clean']
      ],
      handlers: {
        image: handleImageUpload,
        'code-block': handleCodeSnippetInsert,
      },
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];

  return (
    <div className="editor-container">
      <ReactQuill 
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
});

export default Editor;
