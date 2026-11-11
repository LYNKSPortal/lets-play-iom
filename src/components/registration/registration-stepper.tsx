import { Stepper } from "@/components/ui/stepper";

const steps = [
  "Programme",
  "Parent",
  "Child",
  "Agreements",
  "Payment",
  "Confirmation",
];

export function RegistrationStepper({ current }: { current: number }) {
  return <Stepper steps={steps} current={current} />;
}
