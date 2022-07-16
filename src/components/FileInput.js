import { useEffect, useState } from "react";

export default function FileInput({ name, value, onChange, domData, preview }) {
  const [previewUrl, setPreviewUrl] = useState(preview);
  function handleChange(e) {
    const imgFile = e.target.files[0];
    onChange(name, imgFile);
  }

  function handleClearClick() {
    domData.current.value = null;
    onChange(name, null);
  }

  useEffect(() => {
    if (!value) return;
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => {
      setPreviewUrl(preview);
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  return (
    <div>
      <img src={previewUrl} alt="preview" width="200px" />
      <input type="file" alt="preview" onChange={handleChange} ref={domData} />
      {value && <button onClick={handleClearClick}>x</button>}
    </div>
  );
}
