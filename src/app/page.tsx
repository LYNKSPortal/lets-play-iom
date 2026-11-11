import { Hero } from "@/components/home/hero";
import { Welcome } from "@/components/home/welcome";
import { ProgrammesSection } from "@/components/home/programmes-section";
import { CampsPromo } from "@/components/home/camps-promo";
import { WhyUs } from "@/components/home/why-us";
import { CoachesPreview } from "@/components/home/coaches-preview";
import { SponsorSection } from "@/components/home/sponsor-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <ProgrammesSection />
      <CampsPromo />
      <WhyUs />
      <CoachesPreview />
      <SponsorSection />
      <FinalCta />
    </>
  );
}
