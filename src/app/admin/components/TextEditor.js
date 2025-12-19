'use client';
import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';

const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p className="text-gray-500 text-sm">Loading editor...</p>,
});

if (typeof window !== 'undefined') {
  Quill.register('modules/imageResize', ImageResize);
}

const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ direction: 'rtl' }],
      ['clean'],
    ],
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'font',
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'video',
  'blockquote',
  'code-block',
  'direction',
];

export default function TextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);

  return (
    <div className="h-[400px] bg-white rounded-md border border-gray-300">
      <QuillEditor
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[350px] text-gray-800"
        placeholder={placeholder}
      />
    </div>
  );
}