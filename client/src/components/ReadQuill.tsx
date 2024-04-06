import React, { useRef } from 'react';
import { storage } from '../config/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { EditorProps } from '../types';

const Editor = ({ setBody }: EditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const imageHandler = (
    quillRef: React.RefObject<ReactQuill>,
    storage: any
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      if (!quillRef.current || !input.files || input.files.length === 0) {
        // 수정된 부분
        return;
      }
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', `/images/loading.gif`);

      try {
        const storageRef = ref(storage, `image/${Date.now()}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            editor.deleteText(range.index, 1);
            editor.insertEmbed(range.index, 'image', url);
            editor.setSelection({ index: range.index + 1, length: 0 });
          });
        });
      } catch (error) {
        editor.deleteText(range.index, 1);
        console.log(error);
      }
    });
  };

  // 에디터 설정
  const modules = React.useMemo(
    () => ({
      // 툴바 설정
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ], // 리스트, 인덴트 설정
          ['link', 'image'], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
          ['clean'], // toolbar 설정 초기화 설정
        ],
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // 툴바에 사용되는 툴 포맷
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <>
      <ReactQuill
        style={{ width: '630px' }}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요."
        onChange={setBody}
      />
    </>
  );
};

export default Editor;
