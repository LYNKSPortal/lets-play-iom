"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import {
  campSignupFormSchema,
  schoolYears,
  type CampSignupFormValues,
} from "@/lib/validation/camp-signup";
import { registrationBackendConfigured } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";

/**
 * Let's Play Football Camp Form.
 *
 * One long-scroll page, no stepper, used only by the standalone
 * /lets-play-football-camp-form link.
 */
export function CampSignupForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ reference: string; demo: boolean } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CampSignupFormValues>({
    resolver: zodResolver(campSignupFormSchema),
    defaultValues: {
      parentFullName: "",
      childFullName: "",
      childDateOfBirth: "",
      schoolYear: undefined as unknown as (typeof schoolYears)[number],
      medicalNotes: "",
      emergencyContactName: "",
      contactTelephoneNumber: "",
      emailAddress: "",
      agreed: false as unknown as true,
    },
  });

  async function onSubmit(values: CampSignupFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/camp-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ reference: data.reference, demo: data.demo });
    } catch {
      setSubmitError(
        "We couldn't reach the registration service. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <section className="rounded-xl border border-border-subtle bg-card p-8 text-center">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-gold" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white">
          {result.demo ? "Demo Submission Received" : "Registration Received"}
        </h2>
        {result.demo && (
          <p className="mx-auto mt-3 max-w-md rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
            This was a demo submission. No real registration has been made,
            please contact us directly to confirm your child&apos;s place
            until our registration backend is live.
          </p>
        )}
        <p className="mt-4 text-sm text-muted">Registration reference</p>
        <p className="font-display text-2xl font-bold tracking-widest text-gold">
          {result.reference}
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
          A confirmation will be sent to your email once our team has
          processed your request. If you have any questions, email{" "}
          <a href="mailto:info@letsplay.co.im" className="text-gold hover:underline">
            info@letsplay.co.im
          </a>
          .
        </p>
      </section>
    );
  }

  return (
    <div>
      {!registrationBackendConfigured && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong className="font-semibold">Demo mode:</strong> our secure
            registration backend isn&apos;t connected yet, so submissions
            here are not real registrations. Contact us directly to confirm
            your child&apos;s place.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Intro */}
        <section className="rounded-xl border border-border-subtle bg-card p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
            Let&apos;s Play Limited
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-muted">
            Let&apos;s Play Football Development Centre
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-white">
            Football Camp Registration Form
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Welcome to Let&apos;s Play Football! Please complete the
            registration details below and carefully read the parental
            consent and waiver agreement before confirming your
            registration.
          </p>
        </section>

        {/* Child & Parent/Guardian Details */}
        <section className="space-y-5 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Child &amp; Parent/Guardian Details
          </h2>
          <div>
            <Label htmlFor="parentFullName">Parent / Guardian&apos;s Full Name</Label>
            <Input
              id="parentFullName"
              className="mt-1.5"
              aria-invalid={!!errors.parentFullName}
              aria-describedby="parentFullName-error"
              {...register("parentFullName")}
            />
            <FieldError id="parentFullName-error" message={errors.parentFullName?.message} />
          </div>
          <div>
            <Label htmlFor="childFullName">Child&apos;s Full Name</Label>
            <Input
              id="childFullName"
              className="mt-1.5"
              aria-invalid={!!errors.childFullName}
              aria-describedby="childFullName-error"
              {...register("childFullName")}
            />
            <FieldError id="childFullName-error" message={errors.childFullName?.message} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="childDateOfBirth">Child&apos;s Date of Birth</Label>
              <Input
                id="childDateOfBirth"
                type="date"
                className="mt-1.5"
                aria-invalid={!!errors.childDateOfBirth}
                aria-describedby="childDateOfBirth-error"
                {...register("childDateOfBirth")}
              />
              <FieldError id="childDateOfBirth-error" message={errors.childDateOfBirth?.message} />
            </div>
            <div>
              <Label htmlFor="schoolYear">School Year</Label>
              <Select
                id="schoolYear"
                className="mt-1.5"
                defaultValue=""
                aria-invalid={!!errors.schoolYear}
                aria-describedby="schoolYear-error"
                {...register("schoolYear")}
              >
                <option value="" disabled>
                  Select a school year
                </option>
                {schoolYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
              <FieldError id="schoolYear-error" message={errors.schoolYear?.message} />
            </div>
          </div>
        </section>

        {/* Medical Information */}
        <section className="space-y-5 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Medical Information
          </h2>
          <div>
            <Label htmlFor="medicalNotes">
              Medical Notes / Allergies{" "}
              <span className="font-normal normal-case text-muted">(optional)</span>
            </Label>
            <Textarea
              id="medicalNotes"
              className="mt-1.5"
              placeholder="Please include any allergies, medical conditions, medication or additional information our coaches should know about."
              {...register("medicalNotes")}
            />
            <p className="mt-1.5 text-xs text-muted">
              This information is only used to keep your child safe during
              sessions and is handled with restricted access.
            </p>
          </div>
        </section>

        {/* Emergency Contact Details */}
        <section className="space-y-5 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Emergency Contact Details
          </h2>
          <div>
            <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
            <Input
              id="emergencyContactName"
              className="mt-1.5"
              aria-invalid={!!errors.emergencyContactName}
              aria-describedby="emergencyContactName-error"
              {...register("emergencyContactName")}
            />
            <FieldError
              id="emergencyContactName-error"
              message={errors.emergencyContactName?.message}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="contactTelephoneNumber">Contact Telephone Number</Label>
              <Input
                id="contactTelephoneNumber"
                type="tel"
                className="mt-1.5"
                aria-invalid={!!errors.contactTelephoneNumber}
                aria-describedby="contactTelephoneNumber-error"
                {...register("contactTelephoneNumber")}
              />
              <FieldError
                id="contactTelephoneNumber-error"
                message={errors.contactTelephoneNumber?.message}
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                className="mt-1.5"
                aria-invalid={!!errors.emailAddress}
                aria-describedby="emailAddress-error"
                {...register("emailAddress")}
              />
              <FieldError id="emailAddress-error" message={errors.emailAddress?.message} />
            </div>
          </div>
        </section>

        {/* Parental Consent & Waiver Agreement */}
        <section className="space-y-6 rounded-xl border border-border-subtle bg-card p-6">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Parental Consent &amp; Waiver Agreement
            </h2>
            <p className="mt-1 text-sm text-muted">
              Let&apos;s Play Limited (Let&apos;s Play Football Development Centre)
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-border-subtle bg-surface p-4 text-sm leading-relaxed text-muted">
            <div>
              <p className="font-semibold text-white">1. Assumption of Risk</p>
              <p className="mt-1">
                I voluntarily agree to allow my child to participate in all
                football activities organised by Let&apos;s Play Limited. I
                accept and assume all risks, known and unknown, related to
                such participation, including those arising from the
                negligence of the club, its staff and other participants.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">2. Acknowledgement of Risk</p>
              <p className="mt-1">
                I acknowledge that participation in football activities
                involves inherent risks, including physical injury, illness
                or even death. I understand that these risks may result
                from the actions, inactions or negligence of my child,
                other participants, Let&apos;s Play Limited, its staff,
                volunteers or others involved in the activities.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                3. Use of Inflatables (e.g. Bouncy Castles)
              </p>
              <p className="mt-1">
                I understand that inflatables such as bouncy castles may
                occasionally be used during football-related events or
                celebrations. These activities carry risks, including
                falls, collisions and other accidents.
              </p>
              <p className="mt-2">
                I agree that Let&apos;s Play Limited, its staff, volunteers
                and affiliates are not liable for any injury, damage or
                loss resulting from the use of inflatables, whether caused
                by negligence or otherwise. Participation is entirely
                voluntary and at my and my child&apos;s own risk.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">4. Medical Treatment</p>
              <p className="mt-1">
                In the event of an injury or illness, I authorise
                Let&apos;s Play Limited staff and representatives to
                administer first aid to my child and seek further medical
                treatment if necessary. I understand that I am responsible
                for any costs associated with such treatment.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">5. Release of Liability</p>
              <p className="mt-1">
                I, on behalf of myself, my child and our heirs, assigns,
                personal representatives and next of kin, release, waive
                and discharge Let&apos;s Play Limited, its directors,
                officers, employees, volunteers and agents from any and
                all liability, claims, demands or actions arising from any
                injury, illness, damage or loss resulting from my
                child&apos;s participation in football activities, whether
                caused by negligence or otherwise, to the fullest extent
                permitted by law.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">6. Indemnification</p>
              <p className="mt-1">
                I agree to indemnify and hold harmless Let&apos;s Play
                Limited, its directors, officers, employees, volunteers and
                agents against any claims, liabilities, damages, costs and
                expenses (including legal fees) arising from my
                child&apos;s participation in football activities,
                including claims arising from negligence.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">7. Photography and Videography</p>
              <p className="mt-1">
                I understand that Let&apos;s Play Limited may photograph
                and/or record my child during football-related activities
                and events for promotional purposes, including social
                media, websites, newsletters and other marketing materials.
              </p>
              <p className="mt-2">
                Images and videos will be used respectfully and
                appropriately. I may withdraw this consent by notifying
                Let&apos;s Play Limited in writing.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">8. WhatsApp Communication</p>
              <p className="mt-1">
                WhatsApp is our primary communication platform for sharing
                information about football events, programmes and updates.
              </p>
              <p className="mt-2">
                We encourage parents and guardians to join our WhatsApp
                group to stay informed about news, schedules and important
                announcements.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">9. Governing Law</p>
              <p className="mt-1">
                This waiver and release shall be governed by and
                interpreted in accordance with the laws of the Isle of Man.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">10. Cancellation and Refund Policy</p>
              <p className="mt-1">
                Cancellations made four weeks or more before the football
                camp date are eligible for either:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>A 50% refund of the total camp fee; or</li>
                <li>A transfer to another available camp (an additional fee may apply).</li>
              </ul>
              <p className="mt-2">
                Cancellations made within four weeks of the camp are
                non-refundable.
              </p>
              <p className="mt-2">
                If Let&apos;s Play cancels a camp day due to circumstances
                beyond our control, including but not limited to acts of
                God, no refund will be issued for that day.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">11. Agreement to Terms</p>
              <p className="mt-1">
                By completing this registration, I confirm that I am the
                parent or legal guardian of the child named above. I have
                read, understood and agree to all 11 sections of this
                Parental Consent and Waiver Agreement.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Controller
                control={control}
                name="agreed"
                render={({ field }) => (
                  <Checkbox
                    id="agreed"
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                )}
              />
              <Label htmlFor="agreed" className="font-normal leading-relaxed">
                I AGREE TO THE ABOVE. *
              </Label>
            </div>
            <FieldError id="agreed-error" message={errors.agreed?.message} />
          </div>
        </section>

        {submitError && (
          <p role="alert" className="text-sm text-red-300">
            {submitError}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Registration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
