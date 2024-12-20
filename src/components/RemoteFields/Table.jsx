// vendor
import React, { useEffect } from "react";
import {
  TextControl,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useMemo } from "@wordpress/element";

const postModel = {
  post_title: "Title",
  post_name: "Slug",
  post_excerpt: "Excerpt",
  post_content: "Content",
  post_status: "Status",
  featured_media: "Featured media",
  post_date: "Date",
  post_category: "Categories",
  tags_input: "Tags",
};

export default function CustomFieldsTable({ fields, setFields, done }) {
  const __ = wp.i18n.__;

  const postFields = useMemo(() => {
    return Object.keys(postModel).map((key) => {
      const field = fields.find(({ name }) => name === key);
      return field || { name: key, value: null, index: null };
    });
  }, [fields]);

  const customFields = useMemo(() => {
    const customs = fields.filter(
      ({ name }) => !Object.hasOwnProperty.call(postModel, name)
    );
    if (!customs.length) {
      return [{ name: "", foreign: "", index: fields.length }];
    }
    return customs;
  }, [fields]);

  const setField = (attr, index, value) => {
    let newFields;
    if (index >= fields.length) {
      newFields = fields.concat({
        name: "",
        foreign: "",
        index,
        [attr]: value,
      });
    } else {
      newFields = fields.map((field, i) => {
        if (index === i) {
          field[attr] = value;
          if (attr === "name" && field.foreign !== value) {
            field.name = value;
          }
        }
        return { ...field };
      });
    }

    setFields(newFields);
  };

  const setPostField = (name, index, value) => {
    if (index === null) addField(name, value);
    else setField("foreign", index, value);
  };

  const addField = (name = "", foreign = "") => {
    const newFields = fields.concat([{ name, foreign, index: fields.length }]);
    setFields(newFields);
  };

  const dropField = (index) => {
    const newFields = fields.slice(0, index).concat(fields.slice(index + 1));
    setFields(newFields);
  };

  return (
    <>
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
      <table style={{ width: "100%", minWidth: "500px" }}>
        <tbody>
          {postFields.map(({ name, foreign, index }) => (
            <tr key={name}>
              <td>
                <b>{postModel[name]}</b>
              </td>
              <td>
                <TextControl
                  placeholder={__("Foreign field name", "posts-bridge")}
                  value={foreign || ""}
                  onChange={(value) => setPostField(name, index, value)}
                  __nextHasNoMarginBottom
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
        <Button
          variant="secondary"
          onClick={() => addField()}
          style={{
            marginLeft: "1em",
            height: "32px",
            marginBottom: "calc(8px)",
          }}
        >
          {__("Add", "posts-bridge")}
        </Button>
      </div>
      <table style={{ width: "100%", minWidth: "500px" }}>
        <tbody>
          {customFields.map(({ foreign, name, index }) => (
            <tr key={index}>
              <td>
                <TextControl
                  placeholder={__("Custom field name", "posts-bridge")}
                  value={name}
                  onChange={(value) => setField("name", index, value)}
                  __nextHasNoMarginBottom
                />
              </td>
              <td>
                <TextControl
                  placeholder={__("Foreign field name", "posts-bridge")}
                  value={foreign}
                  onChange={(value) => setField("foreign", index, value)}
                  __nextHasNoMarginBottom
                />
              </td>
              <td style={{ borderLeft: "1rem solid transparent" }}>
                <Button
                  isDestructive
                  variant="secondary"
                  onClick={() => dropField(index)}
                  style={{ height: "32px" }}
                >
                  {__("Drop", "posts-bridge")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Spacer paddingY="calc(3px)" />
      <Button
        variant="primary"
        onClick={() => done()}
        style={{ height: "32px" }}
      >
        {__("Done", "posts-bridge")}
      </Button>
    </>
  );
}
