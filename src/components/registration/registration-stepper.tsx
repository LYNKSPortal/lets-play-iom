import { Stepper } from "@/components/ui/stepper";

const steps = ["Programme", "Parent", "Child", "Agreements", "Confirmation"];

export function RegistrationStepper({ current }: { current: number }) {
  return <Stepper steps={steps} current={current} />;
}
