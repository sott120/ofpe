import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cookieErr } from '../util/pageErr';

const ElTargetBtn = (props: {
  elTarget: { index: string };
  setLgShow: (arg0: boolean) => void;
  getLiFunction: () => void;
}) => {
  const navigate = useNavigate();
  const postUpdate = () => {
    navigate('/write/edit', { state: props.elTarget });
  };

  const postDelete = () => {
    if (window.confirm('삭제하시겠습니까?') === true) {
      axios
        .delete(process.env.REACT_APP_ip + `/api/board?index=${props.elTarget.index}`)
        .then((res) => {
          console.log(res);
          props.setLgShow(false);
          alert('삭제되었습니다.');
          props.getLiFunction();
        })
        .catch((e) => {
          cookieErr(e.response.status);
        });
    } else {
      return;
    }
  };
  return (
    <div>
      <span onClick={postUpdate}>수정</span>
      <span onClick={postDelete}>삭제</span>
    </div>
  );
};

const CommentBtn = (props: { getCmt: (arg0: string) => void; el: { index: string; post_index: string } }) => {
  const cmtDelete = (cmtIndex: string, post_index: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?') === true) {
      axios
        .delete(process.env.REACT_APP_ip + `/api/board/comment?index=${cmtIndex}`)
        .then((res) => {
          console.log(res);
          alert('삭제되었습니다.');
          props.getCmt(post_index);
        })
        .catch((e) => {
          cookieErr(e.response.status);
        });
    } else {
      return;
    }
  };
  return (
    <span
      onClick={() => {
        cmtDelete(props.el.index, props.el.post_index);
      }}
    >
      삭제
    </span>
  );
};

export { ElTargetBtn, CommentBtn };
