import { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { storage } from '../config/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import DOMPurify from 'isomorphic-dompurify';
import 'react-quill/dist/quill.core.css';
import axios from 'axios';
import ImageResize from 'quill-image-resize';
// import { ImageActions } from '@xeger/quill-image-actions';
// import { ImageFormats } from '@xeger/quill-image-formats';

// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);
Quill.register('modules/imageResize', ImageResize);

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width',
  'height',
  'float',
];
const imageHandler = (quillRef, storage) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.addEventListener('change', async () => {
    const editor = quillRef.current.getEditor();
    const file = input.files[0];
    // 현재 커서 위치 저장
    const range = editor.getSelection();
    // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
    editor.insertEmbed(range.index, 'image', `/images/loading.gif`);

    try {
      // 파일명을 "image/Date.now()"로 저장
      const storageRef = ref(storage, `image/${Date.now()}`);

      // Firebase Method : uploadBytes, getDownloadURL
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // 이미지 URL 에디터에 삽입
          editor.deleteText(range.index, 1); //placeholder 삭제
          editor.insertEmbed(range.index, 'image', url);
          // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
          editor.setSelection(range.index + 1);
        });
      });
    } catch (error) {
      editor.deleteText(range.index, 1);
      console.log(error);
    }
  });
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }], // header 설정
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

    // 핸들러 설정
    handlers: {
      image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
    },

    // 이미지 크기 조절
    ImageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  },
};

function QuillEditor({ placeholder, value, ...rest }) {
  const quillRef = useRef();
  const [content, setContent] = useState('');
  const sanitizer = DOMPurify.sanitize;

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule('toolbar');
      toolbar.addHandler('image', () => imageHandler(quillRef, storage));
    }
  }, []);

  const DisplayContents = ({ content }) => {
    console.log(DOMPurify.sanitize(content));
    return (
      <div
        className="view ql-editor" // react-quill css
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    );
  };
  const addFunc = async () => {
    const data = {
      group: '제목',
      categoryName: DOMPurify.sanitize(content),
    };
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/blog/newCategory',
      data,
    });
    console.log(res);
  };
  return (
    <div style={{ margin: '50px' }}>
      <button onClick={addFunc}>제출</button>
      <ReactQuill
        style={{ height: '600px' }}
        {...rest}
        placeholder={placeholder}
        theme="snow"
        ref={quillRef}
        value={content || ''}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
      {/* <DisplayContents content={content} /> */}
    </div>
  );
}
export default QuillEditor;
