import QuillEditor from '../components/PostCreate';

export default function Post({ position }: { position: string }) {
  return (
    <>
      {position === '글 작성' && (
        <QuillEditor placeholder={'내용을 입력해주세요'} value={undefined} />
      )}
      {/* {position === '글 확인' && (<)} */}
    </>
  );
}
