// vendor
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  __experimentalHeading as Heading,
  PanelBody,
  PanelRow,
  ToggleControl,
  SelectControl,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";

// source
import { useGeneral } from "../providers/Settings";
import { usePostTypes } from "../providers/PostTypes";
import Backends from "./Backends";
import Synchronize from "./Synchronize";

export default function GeneralSettings() {
  const __ = wp.i18n.__;

  const postTypeOptions = usePostTypes().map((postType) => ({
    label: postType,
    value: postType,
  }));
  const [{ whitelist, backends, synchronize, postTypes }, save] = useGeneral();

  const update = (field) =>
    save({ synchronize, postTypes, whitelist, backends, ...field });

  return (
    <Card size="large" style={{ height: "fit-content" }}>
      <CardHeader>
        <Heading level={3}>{__("General", "posts-bridge")}</Heading>
      </CardHeader>
      <CardBody>
        <PanelBody title={__("Indexes", "posts-bridge")}>
          <Spacer paddingY="calc(8px)" />
          <PanelRow>
            <SelectControl
              label={__("Post types", "posts-bridge")}
              value={postTypes}
              onChange={(postTypes) => update({ postTypes })}
              options={postTypeOptions}
              __nextHasNoMarginBottom
            />
          </PanelRow>
          <Spacer paddingY="calc(8px)" />
          <Synchronize
            synchronize={synchronize}
            setSynchronize={(synchronize) => update({ synchronize })}
          />
        </PanelBody>
        <PanelBody title={__("Remote", "posts-bridge")}>
          <Spacer paddingY="calc(8px)" />
          <PanelRow>
            <ToggleControl
              label={__(
                "Block connections from unkown origins",
                "posts-bridge"
              )}
              checked={whitelist}
              onChange={() => update({ whitelist: !whitelist })}
              __nextHasNoMarginBottom
              help={__(
                "Should HTTP Bridge block requests from origins not listed as backends? If active, incomming connections should include HTTP Origin header",
                "posts-bridge"
              )}
            />
          </PanelRow>
          <Spacer paddingY="calc(8px)" />
          <PanelRow>
            <Backends
              backends={backends}
              setBackends={(backends) => update({ backends })}
            />
          </PanelRow>
        </PanelBody>
      </CardBody>
    </Card>
  );
}
