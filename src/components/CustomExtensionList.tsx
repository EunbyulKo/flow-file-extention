type CustomExtensionListProps = {
  customExts: string[];
  onRemove: (ext: string) => void;
};

export default function CustomExtensionList({ customExts, onRemove }: CustomExtensionListProps) {
  return (
    <div className="custom-list-container">
      <div className="custom-count">{customExts.length}/200</div>

      <div className="custom-tag-wrapper">
        {customExts.map((ext: string) => (
          <div key={ext} className="custom-tag">
            <span className="tag-text">{ext}</span>
            <button className="remove-btn" onClick={() => onRemove(ext)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
