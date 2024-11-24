// vendor
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  __experimentalHeading as Heading,
  PanelRow,
  TextControl,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";

// source
import { useRpcApi } from "../providers/Settings";
import Relations from "./Relations";

export default function RpcApiSettings() {
  const __ = wp.i18n.__;
  const [{ endpoint, user, password, database, relations }, save] = useRpcApi();

  const update = (field) =>
    save({ endpoint, user, password, database, relations, ...field });

  return (
    <Card size="large" style={{ height: "fit-content" }}>
      <CardHeader>
        <Heading level={3}>{__("Odoo JSON-RPC", "posts-bridge")}</Heading>
      </CardHeader>
      <CardBody>
        <PanelRow>
          <TextControl
            label={__("Endpoint", "posts-bridge")}
            onChange={(endpoint) => update({ endpoint })}
            value={endpoint}
            __nextHasNoMarginBottom
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={__("Database", "posts-bridge")}
            onChange={(database) => update({ database })}
            value={database}
            __nextHasNoMarginBottom
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={__("User", "posts-bridge")}
            onChange={(user) => update({ user })}
            value={user}
            __nextHasNoMarginBottom
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={__("Password", "posts-bridge")}
            onChange={(password) => update({ password })}
            value={password}
            __nextHasNoMarginBottom
          />
        </PanelRow>
        <Spacer paddingY="calc(8px)" />
        <PanelRow>
          <Relations
            relations={relations}
            setRelations={(relations) => update({ relations })}
          />
        </PanelRow>
      </CardBody>
    </Card>
  );
}
