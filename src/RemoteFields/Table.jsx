// vendor
import React from "react";
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
};

export default function CustomFieldsTable({ fields, setFields }) {
  const __ = wp.i18n.__;

  const postFields = useMemo(() => {
    const postFields = fields
      .map((field, index) => ({ ...field, index }))
      .filter(({ name }) => Object.hasOwnProperty.call(postModel, name));

    return postFields.concat(
      Object.keys(postModel)
        .filter((field) => !postFields.some(({ name }) => name === field))
        .map((field) => ({ name: field, foreign: null, index: null }))
    );
  }, [fields]);

  const customFields = useMemo(
    () =>
      fields
        .map((field, index) => ({ ...field, index }))
        .filter(({ name }) => !Object.hasOwnProperty.call(postModel, name)),
    [fields]
  );

  const setField = (attr, index, value) => {
    const newFields = fields.map((field, i) => {
      if (index === i) {
        field[attr] = value;
        if (attr === "name" && field.foreign !== value) {
          field.name = value;
        }
      }
      return { ...field };
    });

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
    const newFields = fields.slice(0, index).concat(fields.slice(index + 2));
    setFields(newFields);
  };

  return (
    <div className="components-base-control__label">
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
      <table style={{ width: "100%" }}>
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
      <label
        className="components-base-control__label"
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "calc(8px)",
        }}
      >
        {__("Custom fields", "posts-bridge")}
      </label>
      <table style={{ width: "100%" }}>
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
        variant="secondary"
        onClick={() => addField()}
        style={{ height: "32px" }}
      >
        {__("Add", "posts-bridge")}
      </Button>
    </div>
  );
}
