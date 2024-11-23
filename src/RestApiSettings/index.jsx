// vendor
import React from "react";
import { __ } from "@wordpress/i18n";
import {
  Card,
  CardHeader,
  CardBody,
  __experimentalHeading as Heading,
  PanelRow,
} from "@wordpress/components";

// source
import { useRestApi } from "../providers/Settings";
import Relations from "./Relations";

export default function RestApiSettings() {
  const __ = wp.i18n.__;
  const [{ relations }, save] = useRestApi();
  return (
    <Card size="large" style={{ height: "fit-content" }}>
      <CardHeader>
        <Heading level={3}>{__("REST API", "posts-bridge")}</Heading>
      </CardHeader>
      <CardBody>
        <PanelRow>
          <Relations
            relations={relations}
            setRelations={(relations) => save({ relations })}
          />
        </PanelRow>
      </CardBody>
    </Card>
  );
}
