"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import type { Programme } from "@/types";
import {
  registrationFormSchema,
  schoolYears,
  genderOptions,
  type RegistrationFormValues,
} from "@/lib/validation/registration";
import {
  registrationBackendConfigured,
  standingOrderDetails,
} from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";

/**
 * A single long-scroll registration form (no multi-step wizard). Every
 * field, the full liability agreement, and the full payment agreement are
 * all visible on one page, with one submit button at the bottom. Used by
 * the standalone /lets-play-football-camp-signup-form link.
 */
export function RegistrationFormLong({
  programme,
  source = "direct",
}: {
  programme: Programme;
  source?: "public" | "direct";
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    reference: string;
    demo: boolean;
  } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      programmeSlug: programme.slug,
      source,
      parent: { fullName: "", email: "", phone: "" },
      child: {
        fullName: "",
        dateOfBirth: "",
        gender: undefined as unknown as (typeof genderOptions)[number],
        schoolYear: undefined as unknown as (typeof schoolYears)[number],
        medicalInfo: "",
        additionalInfo: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
      },
      consent: {
        termsAccepted: false as unknown as true,
        paymentAgreementAccepted: true,
      },
    },
  });

  async function onSubmit(values: RegistrationFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/registrations", {
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

  const values = getValues();

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
            please contact us directly to secure your child&apos;s place
            until our registration backend is live.
          </p>
        )}
        <p className="mt-4 text-sm text-muted">Registration reference</p>
        <p className="font-display text-2xl font-bold tracking-widest text-gold">
          {result.reference}
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-lg border border-border-subtle bg-surface p-4 text-left text-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Next step: set up your standing order
          </p>
          <dl className="mt-3 space-y-1 text-muted">
            <div className="flex justify-between gap-3">
              <dt>Account name</dt>
              <dd className="text-white">{standingOrderDetails.accountName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Bank</dt>
              <dd className="text-white">{standingOrderDetails.bankName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Sort code</dt>
              <dd className="text-white">{standingOrderDetails.sortCode}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Account number</dt>
              <dd className="text-white">{standingOrderDetails.accountNumber}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Reference</dt>
              <dd className="text-white">{values.child.fullName}</dd>
            </div>
          </dl>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
          A confirmation will be sent to your email once our registration
          system has processed your request. If you have any questions,
          email{" "}
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
        <input type="hidden" {...register("programmeSlug")} />
        <input type="hidden" {...register("source")} />

        {/* Parent / Guardian */}
        <section className="space-y-5 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Parent or Guardian Information
          </h2>
          <div>
            <Label htmlFor="parent.fullName">Full name</Label>
            <Input
              id="parent.fullName"
              className="mt-1.5"
              aria-invalid={!!errors.parent?.fullName}
              aria-describedby="parent.fullName-error"
              {...register("parent.fullName")}
            />
            <FieldError id="parent.fullName-error" message={errors.parent?.fullName?.message} />
          </div>
          <div>
            <Label htmlFor="parent.email">Email address</Label>
            <Input
              id="parent.email"
              type="email"
              className="mt-1.5"
              aria-invalid={!!errors.parent?.email}
              aria-describedby="parent.email-error"
              {...register("parent.email")}
            />
            <FieldError id="parent.email-error" message={errors.parent?.email?.message} />
          </div>
          <div>
            <Label htmlFor="parent.phone">Contact phone number</Label>
            <Input
              id="parent.phone"
              type="tel"
              className="mt-1.5"
              aria-invalid={!!errors.parent?.phone}
              aria-describedby="parent.phone-error"
              {...register("parent.phone")}
            />
            <FieldError id="parent.phone-error" message={errors.parent?.phone?.message} />
          </div>
        </section>

        {/* Child */}
        <section className="space-y-5 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Child Information
          </h2>
          <div>
            <Label htmlFor="child.fullName">Child&apos;s full name</Label>
            <Input
              id="child.fullName"
              className="mt-1.5"
              aria-invalid={!!errors.child?.fullName}
              aria-describedby="child.fullName-error"
              {...register("child.fullName")}
            />
            <FieldError id="child.fullName-error" message={errors.child?.fullName?.message} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="child.dateOfBirth">Date of birth</Label>
              <Input
                id="child.dateOfBirth"
                type="date"
                className="mt-1.5"
                aria-invalid={!!errors.child?.dateOfBirth}
                aria-describedby="child.dateOfBirth-error"
                {...register("child.dateOfBirth")}
              />
              <FieldError
                id="child.dateOfBirth-error"
                message={errors.child?.dateOfBirth?.message}
              />
            </div>
            <div>
              <Label htmlFor="child.gender">Gender</Label>
              <Select
                id="child.gender"
                className="mt-1.5"
                defaultValue=""
                aria-invalid={!!errors.child?.gender}
                aria-describedby="child.gender-error"
                {...register("child.gender")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
              <FieldError id="child.gender-error" message={errors.child?.gender?.message} />
            </div>
          </div>
          <div>
            <Label htmlFor="child.schoolYear">School year</Label>
            <Select
              id="child.schoolYear"
              className="mt-1.5"
              defaultValue=""
              aria-invalid={!!errors.child?.schoolYear}
              aria-describedby="child.schoolYear-error"
              {...register("child.schoolYear")}
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
            <FieldError id="child.schoolYear-error" message={errors.child?.schoolYear?.message} />
          </div>
          <div>
            <Label htmlFor="child.medicalInfo">
              Medical conditions / information{" "}
              <span className="font-normal normal-case text-muted">
                (optional, only if relevant)
              </span>
            </Label>
            <Textarea
              id="child.medicalInfo"
              className="mt-1.5"
              placeholder="e.g. allergies, conditions coaches should be aware of"
              {...register("child.medicalInfo")}
            />
            <p className="mt-1.5 text-xs text-muted">
              This information is only used to keep your child safe during
              sessions and is handled with restricted access.
            </p>
          </div>
          <div>
            <Label htmlFor="child.additionalInfo">
              Any other information you would like us to know?{" "}
              <span className="font-normal normal-case text-muted">(optional)</span>
            </Label>
            <Textarea id="child.additionalInfo" className="mt-1.5" {...register("child.additionalInfo")} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="child.emergencyContactName">Emergency contact name</Label>
              <Input
                id="child.emergencyContactName"
                className="mt-1.5"
                aria-invalid={!!errors.child?.emergencyContactName}
                aria-describedby="child.emergencyContactName-error"
                {...register("child.emergencyContactName")}
              />
              <FieldError
                id="child.emergencyContactName-error"
                message={errors.child?.emergencyContactName?.message}
              />
            </div>
            <div>
              <Label htmlFor="child.emergencyContactPhone">Emergency contact number</Label>
              <Input
                id="child.emergencyContactPhone"
                type="tel"
                className="mt-1.5"
                aria-invalid={!!errors.child?.emergencyContactPhone}
                aria-describedby="child.emergencyContactPhone-error"
                {...register("child.emergencyContactPhone")}
              />
              <FieldError
                id="child.emergencyContactPhone-error"
                message={errors.child?.emergencyContactPhone?.message}
              />
            </div>
          </div>
        </section>

        {/* Liability and Negligence */}
        <section className="space-y-6 rounded-xl border border-border-subtle bg-card p-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Liability and Negligence
          </h2>

          <div className="space-y-4 rounded-lg border border-border-subtle bg-surface p-4 text-sm leading-relaxed text-muted">
            <div>
              <p className="font-semibold text-white">Acknowledgment of Risk</p>
              <p className="mt-1">
                I acknowledge that participation in football activities
                involves inherent risks, including but not limited to
                physical injury, illness, or even death. I understand that
                these risks may result from the actions, inactions, or
                negligence of my child, other participants, the football
                club, its staff, volunteers, or others involved in the
                activities.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Assumption of Risk</p>
              <p className="mt-1">
                I voluntarily agree to allow my child to participate in all
                football activities organized by Let&apos;s Play Limited
                (Isle of Man). I accept and assume all risks, known and unknown, related to such
                participation, including those arising from the negligence
                of the club, its staff, and other participants.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Release of Liability</p>
              <p className="mt-1">
                In consideration of my child&apos;s participation in
                football activities, I, on behalf of myself, my child, and
                our heirs, assigns, personal representatives, and next of
                kin, hereby release, waive, and discharge Let&apos;s Play
                Limited (Isle of Man), its directors, officers, employees, volunteers, and agents
                (collectively, &quot;the Released Parties&quot;) from any
                and all liability, claims, demands, actions, or causes of
                action, arising out of or related to any injury, illness,
                damage, or loss that may occur as a result of my
                child&apos;s participation in football activities, whether
                caused by the negligence of the Released Parties or
                otherwise, to the fullest extent permitted by law.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Indemnification</p>
              <p className="mt-1">
                I agree to indemnify and hold harmless the Released Parties
                from and against any and all claims, liabilities, damages,
                costs, and expenses (including legal fees) arising out of
                or related to my child&apos;s participation in football
                activities, including claims arising from the negligence
                of the Released Parties.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Medical Treatment</p>
              <p className="mt-1">
                In the event of an injury or illness, I authorize the
                football club and its representatives to seek and obtain
                medical treatment for my child. I understand that I am
                responsible for any costs associated with such medical
                treatment.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Governing Law</p>
              <p className="mt-1">
                This waiver and release shall be governed by and
                interpreted in accordance with the laws of the Isle of Man.
              </p>
            </div>
            <p className="text-xs text-muted">
              By agreeing this, I the subscriber, being the parent or legal
              guardian of the child named on this form, agree to the above.
            </p>
            <div>
              <p className="font-semibold text-white">
                Consent for Photography and Videography
              </p>
              <p className="mt-1">
                As a parent or legal guardian, I hereby grant permission to
                Let&apos;s Play Limited (Isle of Man) to photograph and/or
                record my child during football-related activities and events. I understand that
                these images or videos may be used for promotional
                purposes, including but not limited to social media,
                websites, newsletters, and other marketing materials. I
                acknowledge that these images will be used in a respectful
                and appropriate manner, and I waive any rights to
                compensation or ownership of the images. If at any time I
                wish to revoke this consent, I will notify Let&apos;s Play
                Limited (Isle of Man) in writing.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">
                WhatsApp as our Primary Communication
              </p>
              <p className="mt-1">
                At Let&apos;s Play Limited (Isle of Man), we use WhatsApp as our primary
                communication platform for sharing information about
                football events, programs, and updates. This allows us to
                quickly and efficiently keep everyone informed and
                connected. We encourage all parents and guardians to join
                our WhatsApp group to stay up to date with the latest news
                and schedules. Your participation helps ensure that you
                don&apos;t miss any important announcements.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Controller
                control={control}
                name="consent.termsAccepted"
                render={({ field }) => (
                  <Checkbox
                    id="consent.termsAccepted"
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                )}
              />
              <Label htmlFor="consent.termsAccepted" className="font-normal leading-relaxed">
                I &quot;Agree&quot; to the above. *
              </Label>
            </div>
            <FieldError id="consent-terms-error" message={errors.consent?.termsAccepted?.message} />
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
