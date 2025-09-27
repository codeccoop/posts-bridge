// source
import MappersTable from "./Table";

const { __experimentalSpacer: Spacer } = wp.components;
const { useMemo } = wp.element;
const { __ } = wp.i18n;

const MODEL = {
  post_title: __("Title", "posts-bridge"),
  post_name: __("Slug", "posts-bridge"),
  post_excerpt: __("Excerpt", "posts-bridge"),
  post_content: __("Content", "posts-bridge"),
  post_status: __("Status", "posts-bridge"),
  featured_media: __("Featured media", "posts-bridge"),
  post_date: __("Date", "posts-bridge"),
};

const TAXONOMIES = {
  post_category: __("Categories", "posts-bridge"),
  tags_input: __("Tags", "posts-bridge"),
};

export default function Mappers({
  fieldMappers,
  setFieldMappers,
  taxMappers,
  setTaxMappers,
}) {
  const fields = useMemo(() => {
    return Object.keys(MODEL)
      .map((name) => {
        return (
          fieldMappers.find((m) => m.name === name) || { name, foreign: "" }
        );
      })
      .map((m) => ({ ...m, isCustom: false, label: MODEL[m.name] }))
      .concat(
        fieldMappers
          .filter((m) => !MODEL[m.name])
          .map((m) => ({ ...m, isCustom: true }))
      );
  }, [fieldMappers]);

  const postFields = useMemo(() => {
    return fields.slice(0, Object.keys(MODEL).length);
  }, [fields]);

  const customFields = useMemo(() => {
    return fields.slice(Object.keys(MODEL).length);
  }, [fields]);

  const taxonomies = useMemo(() => {
    return Object.keys(TAXONOMIES)
      .map((name) => {
        return taxMappers.find((m) => m.name === name) || { name, foreign: "" };
      })
      .map((m) => ({ ...m, isCustom: false, label: TAXONOMIES[m.name] }))
      .concat(
        taxMappers
          .filter((m) => !TAXONOMIES[m.name])
          .map((m) => ({ ...m, isCustom: true }))
      );
  }, [taxMappers]);

  if (!customFields.length) {
    setFieldMappers(fieldMappers.concat({ name: "", foreign: "" }));
  }

  if (!taxonomies.slice(2).length) {
    setTaxMappers(taxMappers.concat({ name: "", foreign: "" }));
  }

  return (
    <div>
      <MappersTable
        title={__("Post fields", "posts-bridge")}
        mappers={postFields}
        setMappers={(postFields) =>
          setFieldMappers(
            postFields
              .concat(customFields)
              .map(({ name, foreign }) => ({ name, foreign }))
          )
        }
      />
      <Spacer paddingY="calc(3px)" />
      <MappersTable
        title={__("Taxonomies", "posts-bridge")}
        mappers={taxonomies}
        setMappers={(taxonomies) =>
          setTaxMappers(
            taxonomies.map(({ name, foreign }) => ({ name, foreign }))
          )
        }
      />
      <Spacer paddingY="calc(3px)" />
      <MappersTable
        title={__("Custom fields", "posts-bridge")}
        mappers={customFields}
        setMappers={(customFields) =>
          setFieldMappers(
            postFields
              .concat(customFields)
              .map(({ name, foreign }) => ({ name, foreign }))
          )
        }
      />
    </div>
  );
}
