import React, { Component, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Layout, Breadcrumb, Descriptions, Input, Button, Form } from 'antd';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';
import { HomeOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const header = {
//   headers: {
//       Authorization: "Bearer " + sessionStorage.getItem("Authorization")
//   }
// };

const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 30px 10px 10px 100px;
  text-align: -webkit-center;
  .ant-descriptions-item-label {
    width: 100px;
  }
  .ant-form-horizontal {
    width: 1000px;
  }
`;

const EditorContainer = styled.div`
  .wrapper-class {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editorClassName {
    height: 400px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
  .rdw-fontsize-dropdown {
    width: 50px;
  }
`;

const BlogEditor = () => {
  const baa = (value: { title: any }) => {
    // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.

    let content = {
      title: value.title,
      contents: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    axios
      .post('http://localhost:8000/api/blog/write', content)
      .then((res) => {
        window.location.href = '/blog';
      })
      .catch((err) => {
        alert('이미지를 올릴 수 없습니다.');
      });
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <br />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>공지사항</Breadcrumb.Item>
        <Breadcrumb.Item>공지사항 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ borderTop: '1px solid #eee' }} />
      <br />
      <br />
      <div style={{ textAlign: 'center' }}>
        글을 입력해보세요!
        <br />
        {/* ( 공지사항은 의사 또는 권한이 관리자인 사람만 작성할 수 있습니다. ) */}
        <br />
        <br />
      </div>
      <Container>
        <Form onFinish={baa} style={{ textAlign: 'center' }}>
          <Descriptions
            title=""
            column={1}
            bordered
            size="small"
            style={{ textAlign: 'left' }}
          >
            <Descriptions.Item label="제목" style={{ textAlign: 'center' }}>
              <Form.Item name="title" style={{ margin: '0' }}>
                <Input placeholder="제목을 작성해주세요." />
                {/* <Input name='title' onChange={titleHandler} style={{ width: '100%'}} /> */}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="내용" style={{ textAlign: 'center' }}>
              <EditorContainer>
                {/* react-draft-wysiwyg (What You See Is What You Get)*/}
                <Editor
                  placeholder="내용을 작성해주세요."
                  // 한국어 설정
                  localization={{
                    locale: 'ko',
                  }}
                  toolbar={{
                    // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                    list: { inDropdown: false },
                    textAlign: { inDropdown: false },
                    link: { inDropdown: false },
                    history: { inDropdown: false },
                  }}
                  editorState={editorState} // 에디터 상태 false
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              </EditorContainer>
            </Descriptions.Item>
          </Descriptions>
          <br />
          <Button type="default" htmlType="submit">
            등록
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};
export default BlogEditor;
