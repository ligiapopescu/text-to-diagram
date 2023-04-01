import Mermaid from "./Mermaid";

const DiagramBox = ({ mermaidCode }) => {
  console.log("mermaidCode", mermaidCode);
  return (
    <div className="diagram-box">
      <Mermaid chart={mermaidCode} key={`chrt-${mermaidCode.length}`} />
    </div>
  );
};

export default DiagramBox;
