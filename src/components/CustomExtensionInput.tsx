type CustomExtensionInputProps = {
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
};

export default function CustomExtensionInput({
  customInput,
  setCustomInput,
  onAdd,
}: CustomExtensionInputProps) {
  return (
    <div className="custom-extension-container">
      <h3 className="section-title">커스텀 확장자</h3>

      <input
        type="text"
        placeholder="확장자 입력"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className="custom-input"
      />

      <button className="add-btn" onClick={onAdd}>
        +추가
      </button>
    </div>
  );
}
