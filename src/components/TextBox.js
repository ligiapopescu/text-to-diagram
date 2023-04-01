const TextBox = ({ setTextToTranslate }) => {
  return (
    <div className="diagram-description">
      <textarea
        placeholder="Description for diagram"
        onChange={(e) => setTextToTranslate(e.target.value)}
      />
    </div>
  );
};

export default TextBox;
