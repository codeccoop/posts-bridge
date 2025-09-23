// source
import { usePostTypes } from "../../hooks/useGeneral";
import { useBackends } from "../../hooks/useHttp";
import { isset, prependEmptyOption } from "../../lib/utils";
import FieldWrapper from "../FieldWrapper";

const { TextControl, SelectControl } = wp.components;
const { useEffect, useMemo } = wp.element;

export const INTERNALS = ["enabled", "is_valid", "mappers"];

const ORDER = ["name", "backend", "endpoint", "method"];

export default function BridgeFields({ data, setData, schema, errors = {} }) {
  const [postTypes] = usePostTypes();

  const postTypeOptions = useMemo(() => {
    if (postTypes.length === 0) return [{ label: "", value: "" }];

    return postTypes.sort().map((postType) => ({
      label: postType,
      value: postType,
    }));
  }, [postTypes]);

  const [backends] = useBackends();
  const backendOptions = useMemo(() => {
    if (!backends.length) return [{ label: "", value: "" }];

    return backends
      .map(({ name }) => ({
        label: name,
        value: name,
      }))
      .sort((a, b) => {
        return a.label > b.label ? 1 : -1;
      });
  }, [backends]);

  const fields = useMemo(() => {
    if (!schema) return [];

    return Object.keys(schema.properties)
      .filter((name) => !INTERNALS.includes(name))
      .map((name) => ({
        ...schema.properties[name],
        label: schema.properties[name].title || name,
        name,
        value: schema.properties[name].const,
      }))
      .map((field) => {
        if (field.name === "post_type") {
          return {
            ...field,
            type: "select",
            options: postTypeOptions,
          };
        } else if (field.name === "backend") {
          return {
            ...field,
            type: "select",
            options: backendOptions,
          };
        } else if (field.enum) {
          return {
            ...field,
            type: "select",
            options: field.enum.map((value) => ({ label: value, value })),
          };
        }

        return field;
      });
  }, [schema, backendOptions]);

  useEffect(() => {
    const defaults = fields.reduce((defaults, field) => {
      if (field.default && !isset(data, field.name)) {
        defaults[field.name] = field.default;
      } else if (field.value && field.value !== data[field.name]) {
        defaults[field.name] = field.value;
      } else if (field.type === "select") {
        if (!field.options.length && data[field.name]) {
          defaults[field.name] = "";
        } else if (!data[field.name] || field.options.length === 1) {
          const value = field.options[0]?.value || "";
          if (value !== data[field.name]) {
            defaults[field.name] = value;
          }
        }
      } else if (field.enum && field.enum.length === 1) {
        if (data[field.name] !== field.enum[0]) {
          defaults[field.name] = field.enum[0];
        }
      }

      if (!backends.length && data.backend) {
        defaults.backend = "";
      }

      return defaults;
    }, {});

    if (Object.keys(defaults).length) {
      setData({ ...data, ...defaults });
    }
  }, [data, fields]);

  return fields
    .filter((field) => !field.value)
    .sort((a, b) =>
      ORDER.includes(a.name) && ORDER.includes(b.name)
        ? ORDER.indexOf(a.name) - ORDER.indexOf(b.name)
        : 0
    )
    .map((field) => {
      switch (field.type) {
        case "string":
          return (
            <StringField
              key={field.name}
              error={errors[field.name]}
              label={field.label}
              value={data[field.name] || ""}
              setValue={(value) => setData({ ...data, [field.name]: value })}
            />
          );
        case "select":
          return (
            <SelectField
              key={field.name}
              error={errors[field.name]}
              label={field.label}
              value={data[field.name] || ""}
              setValue={(value) => setData({ ...data, [field.name]: value })}
              options={field.options}
            />
          );
      }
    });
}

export function StringField({ label, value, setValue, error, disabled }) {
  return (
    <FieldWrapper>
      <TextControl
        disabled={disabled}
        label={label}
        value={value}
        onChange={setValue}
        help={error}
        __nextHasNoMarginBottom
        __next40pxDefaultSize
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  options,
  value,
  setValue,
  optional,
  error,
  disabled,
}) {
  if (optional) {
    options = prependEmptyOption(options);
  }

  return (
    <FieldWrapper>
      <SelectControl
        disabled={disabled}
        label={label}
        value={value}
        onChange={setValue}
        options={options}
        help={error}
        __nextHasNoMarginBottom
        __next40pxDefaultSize
      />
    </FieldWrapper>
  );
}
