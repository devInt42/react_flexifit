const DeleteForm = ({ qnaId }) => {
  const handleDelete = () => {
    // 삭제 버튼 클릭 시 동작
    console.log("Delete button clicked for Q&A id:", qnaId);
  };

  return (
    <button className="button delete-button" onClick={handleDelete}>
      삭제
    </button>
  );
};

export default DeleteForm;
