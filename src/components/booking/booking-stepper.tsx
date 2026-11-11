import { Stepper } from "@/components/ui/stepper";

const steps = ["Camp", "Parent", "Player", "Review", "Confirmation"];

export function BookingStepper({ current }: { current: number }) {
  return <Stepper steps={steps} current={current} />;
}
