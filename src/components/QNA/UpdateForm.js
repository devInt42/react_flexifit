const UpdateForm = ({ qnaId }) => {
  const handleEdit = () => {
    // 수정 버튼 클릭 시 동작
    console.log("Edit button clicked for Q&A id:", qnaId);
  };

  return (
    <button className="button edit-button" onClick={handleEdit}>
      수정
    </button>
  );
};
export default UpdateForm;
