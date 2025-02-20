import TemplateWizard from "../../../../src/components/Templates/Wizard";

const { useState } = wp.element;

export default function WPTemplateWizard({ onDone }) {
  const [data, setData] = useState({});

  return <TemplateWizard data={data} setData={setData} onDone={onDone} />;
}
