// source
import Relations from "../../../../src/components/Relations";
import OdooRelation from "./Relation";
import useOdooApi from "../hooks/useOdooApi";
import Databases from "../components/Databases";

const { PanelBody, PanelRow, __experimentalSpacer: Spacer } = wp.components;
const { __ } = wp.i18n;

export default function OdooSetting() {
  const [{ databases, relations }, save] = useOdooApi();

  const update = (field) => save({ databases, relations, ...field });

  return (
    <>
      <PanelRow>
        <Relations
          relations={relations}
          setRelations={(relations) => update({ relations })}
          Relation={OdooRelation}
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelBody
        title={__("Databases", "posts-bridge")}
        initialOpen={databases.length === 0}
      >
        <Databases
          databases={databases}
          setDatabases={(databases) => update({ databases })}
        />
      </PanelBody>
    </>
  );
}
