import TemplateWizard from "../../../../src/components/Templates/Wizard";

const { useState } = wp.element;

export default function RestTemplateWizard({ onDone }) {
  const [data, setData] = useState({});

  return <TemplateWizard data={data} setData={setData} onDone={onDone} />;
}
