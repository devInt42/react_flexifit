import "../../styles/pages/QNA.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getReplyData } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";

const ReplyForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ReplyList = useSelector((state) => state.replyData);
  const [replyContent, setReplyContent] = useState("");
  const [qnaId, setQnaId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("qnaId");
    setQnaId(id);
  }, [location]);

  useEffect(() => {
    dispatch(getReplyData());
  }, [dispatch]);

  //초기값 저장
  useEffect(() => {
    if (ReplyList && qnaId) {
      const reply = ReplyList.find((reply) => reply.qna_id === parseInt(qnaId));
      if (reply) {
        setReplyContent(reply.reply_content);
      }
    }
  }, [ReplyList, qnaId]);

  return (
    <div className="qna-Writepage">
      <p className="WriteLogo">Reply</p>
      <p className="WriteMiniLogo">상품 Q&A입니다.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            답변
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            placeholder="내용을 입력하세요"
            value={replyContent}
          ></textarea>
        </div>

        <div className="button-row">
          <Link to="/qna" className="button list-button">
            목록
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
