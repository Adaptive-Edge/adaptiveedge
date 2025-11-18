import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, List, ListOrdered, Image, Link, Quote, Code } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const insertList = (ordered: boolean) => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;

    const range = selection.getRangeAt(0);
    const listType = ordered ? 'ol' : 'ul';
    const list = document.createElement(listType);
    const listItem = document.createElement('li');
    
    // Get selected text or use placeholder
    const selectedText = selection.toString() || 'List item';
    listItem.textContent = selectedText;
    list.appendChild(listItem);

    // Delete selected text and insert list
    range.deleteContents();
    range.insertNode(list);
    
    // Move cursor to end of list item
    range.setStartAfter(listItem);
    range.setEndAfter(listItem);
    selection.removeAllRanges();
    selection.addRange(range);
    
    handleChange();
  };

  const insertLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setIsLinkModalOpen(true);
    } else {
      alert('Please select some text first');
    }
  };

  const confirmLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setIsLinkModalOpen(false);
    }
  };

  const insertImage = () => {
    setIsImageModalOpen(true);
  };

  const confirmImage = () => {
    if (imageUrl) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setIsImageModalOpen(false);
    }
  };

  const ToolbarButton = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap">
        <ToolbarButton onClick={() => execCommand('bold')} title="Bold">
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('italic')} title="Italic">
          <Italic size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton onClick={() => insertList(false)} title="Bullet List">
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertList(true)} title="Numbered List">
          <ListOrdered size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton onClick={() => execCommand('formatBlock', '<blockquote>')} title="Quote">
          <Quote size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', '<pre>')} title="Code Block">
          <Code size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insert Image">
          <Image size={18} />
        </ToolbarButton>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <select
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          className="px-2 py-1 text-sm border border-gray-300 rounded"
          defaultValue=""
        >
          <option value="" disabled>Heading</option>
          <option value="<p>">Normal</option>
          <option value="<h1>">Heading 1</option>
          <option value="<h2>">Heading 2</option>
          <option value="<h3>">Heading 3</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="w-full px-4 py-3 min-h-[300px] focus:outline-none prose prose-sm max-w-none"
        onInput={handleChange}
        onBlur={handleChange}
        dangerouslySetInnerHTML={{ __html: value || `<p>${placeholder || 'Start writing...'}</p>` }}
        style={{
          minHeight: '300px',
          maxHeight: '600px',
          overflowY: 'auto'
        }}
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsLinkModalOpen(false);
                  setLinkUrl('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLink}
                className="px-4 py-2 bg-coral text-white rounded hover:bg-opacity-90"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsImageModalOpen(false);
                  setImageUrl('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmImage}
                className="px-4 py-2 bg-coral text-white rounded hover:bg-opacity-90"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
