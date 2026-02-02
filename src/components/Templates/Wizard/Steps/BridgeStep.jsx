import TemplateStep from "./Step";
import Field from "../../Field";
import { sortByNamesOrder } from "../../../../lib/utils";
import { useRemoteCPTs } from "../../../../hooks/useAddon";

const { useMemo } = wp.element;
const { __ } = wp.i18n;

const fieldsOrder = ["post_type", "foreign_key"];

export default function BridgeStep({ fields, data, setData }) {
  const rcpts = useRemoteCPTs();

  const stepFields = useMemo(() => {
    return fields.map((field) => {
      if (field.name === "post_type") {
        field = { ...field };
        field.options = field.options.filter((opt) => !rcpts.has(opt.value));
      }

      return field;
    });
  }, [fields, rcpts]);

  const sortedFields = useMemo(
    () => sortByNamesOrder(stepFields, fieldsOrder),
    [stepFields]
  );

  return (
    <TemplateStep
      name={__("Bridge", "posts-bridge")}
      description={__("Configure the bridge", "posts-bridge")}
    >
      {sortedFields.map((field) => (
        <Field
          key={field.name}
          data={{
            ...field,
            value: data[field.name] || "",
            onChange: (value) => setData({ [field.name]: value }),
          }}
        />
      ))}
    </TemplateStep>
  );
}
