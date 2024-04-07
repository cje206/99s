import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import DOMPurify from 'isomorphic-dompurify';
import axios from 'axios';
import ImageResize from '@looop/quill-image-resize-module-react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'; // 이 위치로 옮겼습니다.
import '../styles/test.scss';

import { storage } from '../config/Firebase';
import { ButtonExtraStyled, ButtonExtra, TitleInput } from './MainPopularStyle';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  },
};

function QuillEditor({ placeholder, value, ...rest }) {
  const quillRef = useRef();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
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
      postTitle: title, //칸 만들어서 그 값 넣기
      content: content,
      // blogId: blog.id,
    };
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/post/write',
      data,
    });
    console.log(res);
    document.querySelector('.result').innerHTML = DOMPurify.sanitize(content);
    document.querySelector('.title').innerHTML = DOMPurify.sanitize(title);
  };
  return (
    <>
      <div style={{ margin: '30px' }}>
        <TitleInput
          className="ql-snow ql-toolbar"
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TitleInput>

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
        <ButtonExtra style={{ marginTop: '60px' }}>
          {/* <Link to="/blog/:id/:postId"> */}
          <ButtonExtraStyled onClick={addFunc} smallbtn={true}>
            작성하기
          </ButtonExtraStyled>
          {/* </Link> */}
          <Link to="/blog/:id">
            <ButtonExtraStyled smallbtn={true} style={{ color: 'gray' }}>
              취소
            </ButtonExtraStyled>
          </Link>
        </ButtonExtra>

        {/* <DisplayContents content={content} /> */}
      </div>
      <div className="result"></div>
      <div className="title"></div>
    </>
  );
}
export default QuillEditor;
