import { useEffect, useState } from "react";
import FixedExtensionSelector from "./components/FixedExtensionSelector";
import CustomExtensionInput from "./components/CustomExtensionInput";
import CustomExtensionList from "./components/CustomExtensionList";
import "./assets/css/app.css";
import "./assets/css/fixed-extensions.css";
import "./assets/css/custom-extension.css";
import "./assets/css/custom-extension-list.css";
import { fetchExtensions, addExtension, removeExtension } from "./api/LambdaApiClient";

const FIXED_EXTENSIONS = ["bat","cmd","com","cpl","exe","scr","js"];

function App() {
  const [checkedFixed, setCheckedFixed] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState<string>("");
  const [customExts, setCustomExts] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const list = await fetchExtensions();

      if (!list || !Array.isArray(list)) return;

      const fixedChecked = list.filter((ext: string) =>
        FIXED_EXTENSIONS.includes(ext)
      );
      const customAdded = list.filter(
        (ext: string) => !FIXED_EXTENSIONS.includes(ext)
      );

      setCheckedFixed(fixedChecked);
      setCustomExts(customAdded);
    };

    loadData();
  }, []);

  const toggleFixed = async (ext: string) => {
    const isChecked = checkedFixed.includes(ext);

    const result = await apiCall(
      () => (isChecked ? removeExtension(ext) : addExtension(ext)),
      () => alert("서버 저장에 실패했습니다. 다시 시도해주세요.")
    );

    if (result !== null) {
      setCheckedFixed((prev) =>
        isChecked ? prev.filter((e) => e !== ext) : [...prev, ext]
      );
    }
  };

  const addCustomExt = async () => {
    const ext = customInput.trim().toLowerCase();
    if (!ext) return;

    if (ext.length > 20) {
      alert("확장자는 20자 이하만 입력 가능합니다.");
      return;
    }

    if (FIXED_EXTENSIONS.includes(ext)) {
      alert(`"${ext}"은(는) 고정 확장자에 이미 포함되어 있습니다.`);
      return;
    }

    if (customExts.includes(ext)) {
      alert(`"${ext}"은(는) 이미 추가된 확장자입니다.`);
      return;
    }

    if (customExts.length >= 200) {
      alert("커스텀 확장자는 최대 200개까지만 추가할 수 있습니다.");
      return;
    }

    const result = await apiCall(
      () => addExtension(ext),
      () => alert("서버 저장 중 오류가 발생했습니다.")
    );

    if (result !== null) {
      setCustomExts((prev) => [...prev, ext]);
      setCustomInput("");
    }
  };

  const removeCustomExt = async (ext: string) => {
    const result = await apiCall(
      () => removeExtension(ext),
      () => alert("서버 삭제 중 오류가 발생했습니다.")
    );

    if (result !== null) {
      setCustomExts((prev) => prev.filter((e) => e !== ext));
    }
  };

  async function apiCall<T>(apiFunc: () => Promise<T>, onError?: (err: unknown) => void): Promise<T | null> {
    try {
      return await apiFunc();
    } catch (err) {
      console.error("API 호출 오류:", err);
      if (onError) onError(err);
      return null;
    }
  }

  return (
    <div className="container">
      <FixedExtensionSelector
        fixedExtensions={FIXED_EXTENSIONS}
        checkedFixed={checkedFixed}
        onToggle={toggleFixed}
      />

      <CustomExtensionInput
        customInput={customInput}
        setCustomInput={setCustomInput}
        onAdd={addCustomExt}
      />

      <CustomExtensionList customExts={customExts} onRemove={removeCustomExt} />
    </div>
  );
}

export default App;
