// source
import NewRelation from "../../../../src/components/Relations/NewRelation";

const { TextControl } = wp.components;
const { useEffect } = wp.element;
const { __ } = wp.i18n;

const DEFAULT_MAPPERS = Object.entries({
  post_title: "title.raw",
  post_name: "slug",
  post_excerpt: "excerpt.raw",
  post_content: "content.raw",
  post_status: "status",
  featured_media: "featured_media",
  post_date: "date",
  post_category: "categories",
  tags_input: "tags",
}).map(([name, foreign]) => ({ name, foreign }));

function RemotePostTypeField({ data, update }) {
  useEffect(() => {
    update({ ...data, remote_type: data.post_type, fields: DEFAULT_MAPPERS });
  }, [data.post_type]);

  return (
    <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
      <TextControl
        label={__("Remote post type", "posts-bridge")}
        value={data.remote_type || data.post_type}
        onChange={(remote_type) => update({ ...data, remote_type })}
        __nextHasNoMarginBottom
        __next40pxDefaultSize
      />
    </div>
  );
}

export default function NewWPRelation({ add, schema }) {
  return (
    <NewRelation add={add} schema={schema}>
      {({ data, update }) => (
        <RemotePostTypeField data={data} update={update} />
      )}
    </NewRelation>
  );
}
