// source
import Relations from "../../../components/Relations";
import RestRelation from "./Relation";
import useRestApi from "./useRestApi";

// assets
import logo from "../../../../assets/rest.png";

const { PanelRow } = wp.components;
const { useEffect } = wp.element;

export default function RestApiSettings() {
  const [{ relations }, save] = useRestApi();

  useEffect(() => {
    const img = document.querySelector("#rest-api .addon-logo");
    if (!img) return;
    img.setAttribute("src", "data:image/png;base64," + logo);
    img.style.width = "65px";
  }, []);

  return (
    <PanelRow>
      <Relations
        relations={relations}
        setRelations={(relations) => save({ relations })}
        Relation={RestRelation}
      />
    </PanelRow>
  );
}
