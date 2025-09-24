const { TextControl, Button, __experimentalSpacer: Spacer } = wp.components;
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
  post_category: __("Categories", "posts-bridge"),
  tags_input: __("Tags", "posts-bridge"),
};

export default function Mappers({ mappers, setMappers }) {
  const fields = useMemo(() => {
    return mappers.map((m, index) => ({ ...m, index }));
  }, [mappers]);

  const postFields = useMemo(() => {
    return Object.keys(MODEL).map((key) => {
      const field = fields.find(({ name }) => name === key);
      return field || { name: key, value: "", index: null };
    });
  }, [fields]);

  const customFields = useMemo(() => {
    const customs = fields.filter(
      ({ name }) => !Object.hasOwnProperty.call(MODEL, name)
    );

    if (!customs.length) {
      return [{ name: "", foreign: "", index: fields.length }];
    }

    return customs;
  }, [fields]);

  const addMapper = (index) => {
    const newMappers = mappers
      .slice(0, index)
      .concat([{ name: "", foreign: "" }])
      .concat(mappers.slice(index, mappers.length));

    setMappers(newMappers);
  };

  const setMapper = (attr, index, value) => {
    const newMappers = mappers.map((mapper, i) => {
      if (index === i) {
        mapper[attr] = value;

        if (attr === "name" && mapper.foreign !== value) {
          mapper.name = value;
        }
      }

      return { ...mapper };
    });

    setMappers(newMappers);
  };

  const setPostField = (name, index, foreign) => {
    if (index !== null) {
      setMapper("foreign", index, foreign);
    } else {
      const newMappers = mappers.concat({
        name,
        foreign,
      });

      setMappers(newMappers);
    }
  };

  const dropMapper = (index) => {
    const newMappers = mappers.slice(0, index).concat(mappers.slice(index + 1));
    setMappers(newMappers);
  };

  if (fields.length === 0) addMapper(0);

  return (
    <div>
      <label
        className="components-base-control__label"
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "calc(8px)",
        }}
      >
        {__("Post fields", "posts-bridge")}
      </label>
      <table
        style={{
          width: "calc(100% + 10px)",
          minWidth: "500px",
          borderSpacing: "5px",
          margin: "0 -5px",
        }}
      >
        <colgroup>
          <col span="1" style={{ width: "clamp(150px, 15vw, 300px)" }} />
          <col span="1" style={{ width: "auto" }} />
          <col span="1" style={{ width: "85px" }} />
        </colgroup>
        <tbody>
          {postFields.map(({ name, foreign, index }) => (
            <tr key={name}>
              <td>
                <b>{MODEL[name]}</b>
              </td>
              <td>
                <TextControl
                  placeholder={__("Foreign field name", "posts-bridge")}
                  value={foreign || ""}
                  onChange={(value) => setPostField(name, index, value)}
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Spacer paddingY="calc(3px)" />
      <div style={{ display: "flex" }}>
        <label
          className="components-base-control__label"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            fontWeight: 500,
            lineHeight: "32px",
          }}
        >
          {__("Custom fields", "posts-bridge")}
        </label>
      </div>
      <table
        style={{
          width: "calc(100% + 10px)",
          minWidth: "500px",
          borderSpacing: "5px",
          margin: "0 -5px",
        }}
      >
        <colgroup>
          <col span="1" style={{ width: "clamp(150px, 15vw, 300px)" }} />
          <col span="1" style={{ width: "auto" }} />
          <col span="1" style={{ width: "85px" }} />
        </colgroup>
        <tbody>
          {customFields.map(({ foreign, name, index }) => (
            <tr key={index}>
              <td>
                <TextControl
                  placeholder={__("Custom field name", "posts-bridge")}
                  value={name}
                  onChange={(value) => setMapper("name", index, value)}
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              </td>
              <td>
                <TextControl
                  placeholder={__("Foreign field name", "posts-bridge")}
                  value={foreign}
                  onChange={(value) => setMapper("foreign", index, value)}
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "0.45em",
                    gap: "0.45em",
                  }}
                >
                  <Button
                    size="compact"
                    variant="secondary"
                    disabled={!name || !foreign}
                    onClick={() => addMapper(index + 1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      justifyContent: "center",
                    }}
                    __next40pxDefaultSize
                  >
                    +
                  </Button>
                  <Button
                    disabled={index === 0 && customFields.length === 1}
                    variant="secondary"
                    onClick={() => dropMapper(index)}
                    style={{
                      width: "40px",
                      height: "40px",
                      justifyContent: "center",
                    }}
                    isDestructive
                    __next40pxDefaultSize
                  >
                    -
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
