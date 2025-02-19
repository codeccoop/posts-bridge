import { usePostTypes } from "../../../providers/Settings";
import TemplateStep from "./Step";
import Field from "../Field";

const { useMemo } = wp.element;
const { __ } = wp.i18n;

const fieldsOrder = [
  "name",
  "label",
  "singular_label",
  "public",
  "publicly_queryable",
  "has_archive",
  "show_in_menu",
  "rewrite",
  "rest_base",
  "supports",
  "taxonomies",
];

export default function PostTypeStep({ fields, data, setData }) {
  const postTypes = usePostTypes();

  const [postType, setPostType] = useState(
    postTypes.includes(data.name) ? data.name : ""
  );

  const [newPostType, setNewPostType] = useState(data.name || "");

  const postTypeOptions = [{ label: "", value: "" }].concat(
    postTypes.map((name) => ({
      label: name,
      value: name,
    }))
  );

  useEffect(() => {
    if (postType) {
      setData({ name: postType });
    } else {
      setData(Object.fromEntries(fields.map(({ name }) => [name, null])));
    }
  }, [postType]);

  const sortedFields = useMemo(
    () =>
      fields.sort(
        (a, b) => fieldsOrder.indexOf(a.name) - fieldsOrder.indexOf(b.name)
      ),
    [fields]
  );

  const filteredFields = useMemo(
    () => (postType ? [] : sortedFields.filter(({ name }) => name !== "name")),
    [postTypes, sortedFields]
  );

  const nameField = useMemo(
    () => sortedFields.find(({ name }) => name === "name"),
    [sortedFields]
  );

  const nameConflict = useMemo(
    () => !!newPostType && postTypes.includes(newPostType.trim()),
    [postTypes, newPostType]
  );

  useEffect(() => {
    if (!data.name) return;

    if (!postType && postTypes.includes(data.name)) {
      setPostType(data.name);
    } else if (data.name !== newPostType) {
      setNewPostType(data.name);
    }
  }, [data.name]);

  useEffect(() => {
    if (!nameConflict && newPostType) {
      setData({ name: newPostType });
    }
  }, [newPostType]);

  useEffect(() => {
    if (postType) {
      setNewPostType("");
    }
  }, [postType]);

  return (
    <TemplateStep
      name={__("Post type", "posts-bridge")}
      description={__("Configure the post type to bridge", "posts-bridge")}
    >
      <SelectControl
        label={__("Reuse a post type", "posts-bridge")}
        value={postType}
        options={postTypeOptions}
        onChange={(value) => setPostType(value)}
        __nextHasNoMarginBottom
      />
      {!postType && (
        <Field
          error={
            nameConflict
              ? __("This post type already exists", "posts-bridge")
              : false
          }
          data={{
            ...nameField,
            value: newPostType || "",
            onChange: setNewPostType,
          }}
        />
      )}
      {filteredFields.map((field) => (
        <Field
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
