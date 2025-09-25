import BackendStep from "./Steps/BackendStep";
import BridgeStep from "./Steps/BridgeStep";
import CredentialStep from "./Steps/CredentialStep";
import { getGroupFields } from "./lib";

const { useState, useEffect, useMemo } = wp.element;

const STEPS = [
  {
    name: "credential",
    component: CredentialStep,
  },
  {
    name: "backend",
    component: BackendStep,
  },
  {
    name: "bridge",
    component: BridgeStep,
  },
];

export default function useStepper({ fields, data }) {
  const [step, setStep] = useState(0);
  const { name, component: Step } = useMemo(() => STEPS[step], [step]);

  const stepFields = useMemo(() => {
    return getGroupFields(fields, name);
  }, [step, fields]);

  useEffect(() => {
    if (!fields.length) return;
    if (!stepFields.length) {
      setTimeout(() => move(1));
    }
  }, [fields, stepFields]);

  const done = useMemo(() => {
    if (!stepFields.length) return true;

    return stepFields.reduce((isValid, field) => {
      const value = data[name]?.[field.name]; // || defaults[group]?.[field.name];
      return isValid && (!!value || !field.required);
    }, true);
  }, [stepFields, data, name]);

  const move = (direction) => {
    let newStep = step + direction;
    let group = STEPS[newStep].name;
    let groupFields = getGroupFields(fields, group);

    while (
      groupFields.length === 0 &&
      newStep > 0 &&
      newStep < STEPS.length - 1
    ) {
      newStep += direction;
      group = STEPS[newStep];
      groupFields = getGroupFields(fields, group);
    }

    setStep(newStep);
  };

  return {
    done,
    move,
    step,
    Step,
    name,
    reset: () => setStep(0),
    trailing: step === STEPS.length - 1,
  };
}
