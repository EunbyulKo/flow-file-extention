type FixedExtensionSelectorProps = {
  fixedExtensions: string[];
  checkedFixed: string[];
  onToggle: (ext: string) => void;
};

export default function FixedExtensionSelector({
  fixedExtensions,
  checkedFixed,
  onToggle,
}: FixedExtensionSelectorProps) {
  return (
    <div className="fixed-extensions-container">
      <h3 className="section-title">고정 확장자</h3>
      {fixedExtensions.map((extention) => (
        <label key={extention} className="extension-checkbox">
          <input
            type="checkbox"
            checked={checkedFixed.includes(extention)}
            onChange={() => onToggle(extention)}
          />
          <span className="extension-label">{extention}</span>
        </label>
      ))}
    </div>
  );
}
