import React, { useState, useEffect } from "react";
import "../../styles/pages/QNA.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getReplyData } from "../../store/action";

const BoardForm = () => {
  const dispatch = useDispatch();
  const qnaList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const [qnaId, setQnaId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedQna, setSelectedQna] = useState("");
  const [reply, setReply] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userSeq = sessionStorage.getItem("userSeq");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const ReplyList = useSelector((state) => state.replyData);

  useEffect(() => {
    dispatch(getReplyData());
  }, [dispatch]);

  console.log(ReplyList);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("qnaId");
    setQnaId(id);
  }, [location]);

  useEffect(() => {
    if (qnaList.length > 0) {
      const foundQna = qnaList.find((qna) => qna.qna_id == qnaId);
      if (foundQna) {
        setSelectedQna(foundQna);
        setTitle(foundQna.qna_title);
        setContent(foundQna.qna_content);
        setSelectedFile(foundQna.qna_imageUrl);
      }
    }
  }, [qnaId]);

  //admin
  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const param = {
      data: {
        qnaId: qnaId,
        reply: reply,
      },
    };
    try {
      const res = await axios.post(`http://localhost:8080/qna/reply`, param);
      if (res.data.resultMsg == "false") {
        alert("필수값을 입력해주세요.");
      } else {
        alert("등록이 완료되었습니다.");
        navigate("/qna");
      }
    } catch (err) {
      console.log(err);
    }
    setShowReplyForm(false);
  };

  //user
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //QNA 정보 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("file", null);
    }

    formData.append("title", title);
    formData.append("content", content);
    formData.append("qnaId", qnaId);

    try {
      navigate("/qna");
      const res = await axios.post(
        `http://localhost:8080/qna/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("수정이 완료되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  //QNA 정보 삭제
  const removeQna = async () => {
    const param = {
      data: {
        qnaId: qnaId,
      },
    };
    try {
      navigate("/qna");
      const res = await axios.post(`http://localhost:8080/qna/delete`, param);
      alert("삭제가 완료되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  //관리자 QNA
  const replyQna = () => {
    setShowReplyForm(true);
  };

  return (
    <div className="qna-Writepage">
      <p className="WriteLogo">Q & A</p>
      <p className="WriteMiniLogo">상품 Q&A입니다.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            제목
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={content}
            onChange={handleContent}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFileSm" className="form-label">
            첨부파일
          </label>
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {/* 경로 수정 */}
        {selectedFile && (
          <div>
            <img src={selectedFile} alt="Selected File" />
          </div>
        )}
        <div className="button-row">
          <Link to="/qna" className="button list-button">
            목록
          </Link>
          {userSeq !== "0" && (
            <span className="button cancel-button" onClick={removeQna}>
              삭제
            </span>
          )}
          {userSeq == "0" && (
            <span>
              <span
                className="button submit-button"
                onClick={replyQna}
                style={{ marginBottom: "15px" }}
              >
                답글 달기
              </span>
              {showReplyForm && (
                <div className="reply-section">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="답글을 입력하세요."
                    value={reply}
                    onChange={handleReply}
                  ></textarea>
                  <button
                    type="button"
                    style={{ marginTop: "10px" }}
                    className="button submit-button"
                    onClick={handleReplySubmit}
                  >
                    저장
                  </button>
                </div>
              )}
            </span>
          )}
          {userSeq !== "0" && (
            <button
              type="submit"
              className="button submit-button"
              onClick={handleSubmit}
            >
              수정
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
