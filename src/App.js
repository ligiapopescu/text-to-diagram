import { useState } from "react";
import DiagramBox from "./components/DiagramBox";
import TextBox from "./components/TextBox";

const initialMermaidDiagram = `graph  TD
A[Start] --> B(Write some text)
B --> C(Press the button to generate a diagram)
C --> D(Repeat)`;

const App = () => {
  const handleClick = async () => {
    const response = await callOpenAiAPI(textToTranslate);
    if (response && response.data && response.data.choices) {
      const result = `graph ${response.data.choices[0]?.text}`;
      setMermaidCode(result);
    }
  };

  const [mermaidCode, setMermaidCode] = useState(initialMermaidDiagram);
  const [textToTranslate, setTextToTranslate] = useState("");
  return (
    <div className="app">
      <TextBox setTextToTranslate={setTextToTranslate} />
      <button id="nl2diagramBtn" onClick={handleClick}>
        Text to diagram{" "}
      </button>
      <DiagramBox mermaidCode={mermaidCode} />
    </div>
  );
};

export default App;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const callOpenAiAPI = async (textToTransform) => {
  const prompt = `${textToTransform}\n\n
  Mermaid diagram corresponding to the text above is:
  \n\`\`\`mermaid\ngraph`;
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 250,
    top_p: 1,
    best_of: 3,
    frequency_penalty: 2,
    presence_penalty: 0,
    stop: ["```"],
  });
};
