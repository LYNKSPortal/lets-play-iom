"use client";

import { useState } from "react";
import Link from "next/link";
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
import { RegistrationStepper } from "@/components/registration/registration-stepper";

type Step = 1 | 2 | 3 | 4 | 5;

export function RegistrationForm({ programme }: { programme: Programme }) {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    reference: string;
    demo: boolean;
  } | null>(null);

  const {
    register,
    control,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      programmeSlug: programme.slug,
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
        paymentAgreementAccepted: false as unknown as true,
      },
    },
  });

  async function goNext() {
    if (step === 2) {
      const valid = await trigger(["parent.fullName", "parent.email", "parent.phone"]);
      if (!valid) return;
    }
    if (step === 3) {
      const valid = await trigger([
        "child.fullName",
        "child.dateOfBirth",
        "child.gender",
        "child.schoolYear",
        "child.emergencyContactName",
        "child.emergencyContactPhone",
      ]);
      if (!valid) return;
    }
    setStep((s) => Math.min(5, s + 1) as Step);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1) as Step);
  }

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
        setSubmitError(
          data.error ?? "Something went wrong. Please try again."
        );
        return;
      }
      setResult({ reference: data.reference, demo: data.demo });
      setStep(5);
    } catch {
      setSubmitError(
        "We couldn't reach the registration service. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const values = getValues();

  return (
    <div>
      <RegistrationStepper current={step} />

      {!registrationBackendConfigured && step < 5 && (
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("programmeSlug")} />

        {step === 1 && (
          <section className="rounded-xl border border-border-subtle bg-card p-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {programme.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {programme.description}
            </p>
            {programme.price && (
              <div className="mt-5 flex items-center justify-between rounded-lg border border-border-subtle bg-surface px-4 py-3">
                <span className="text-sm text-muted">Price</span>
                <span className="font-display text-xl font-bold text-gold">
                  {programme.price}
                </span>
              </div>
            )}
            <div className="mt-6">
              <Button type="button" onClick={goNext} size="lg">
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
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
              <FieldError
                id="parent.fullName-error"
                message={errors.parent?.fullName?.message}
              />
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
              <FieldError
                id="parent.email-error"
                message={errors.parent?.email?.message}
              />
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
              <FieldError
                id="parent.phone-error"
                message={errors.parent?.phone?.message}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Button type="button" variant="secondary" onClick={goBack}>
                Back
              </Button>
              <Button type="button" onClick={goNext}>
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 3 && (
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
              <FieldError
                id="child.fullName-error"
                message={errors.child?.fullName?.message}
              />
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
                <FieldError
                  id="child.gender-error"
                  message={errors.child?.gender?.message}
                />
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
              <FieldError
                id="child.schoolYear-error"
                message={errors.child?.schoolYear?.message}
              />
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
                <span className="font-normal normal-case text-muted">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="child.additionalInfo"
                className="mt-1.5"
                {...register("child.additionalInfo")}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="child.emergencyContactName">
                  Emergency contact name
                </Label>
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
                <Label htmlFor="child.emergencyContactPhone">
                  Emergency contact number
                </Label>
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
            <div className="flex items-center justify-between pt-2">
              <Button type="button" variant="secondary" onClick={goBack}>
                Back
              </Button>
              <Button type="button" onClick={goNext}>
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6 rounded-xl border border-border-subtle bg-card p-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Review &amp; Agreements
            </h2>

            <div className="space-y-4 text-sm">
              <div className="rounded-lg border border-border-subtle bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  Programme
                </p>
                <p className="mt-1 text-white">{programme.name}</p>
                {programme.price && (
                  <p className="text-muted">{programme.price}</p>
                )}
              </div>
              <div className="rounded-lg border border-border-subtle bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  Parent / Guardian
                </p>
                <p className="mt-1 text-white">{values.parent.fullName}</p>
                <p className="text-muted">{values.parent.email}</p>
                <p className="text-muted">{values.parent.phone}</p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  Child
                </p>
                <p className="mt-1 text-white">{values.child.fullName}</p>
                <p className="text-muted">
                  {values.child.schoolYear} &middot; {values.child.gender}
                </p>
                <p className="text-muted">
                  Date of birth: {values.child.dateOfBirth}
                </p>
                <p className="text-muted">
                  Emergency contact: {values.child.emergencyContactName}
                  {" "}&middot;{" "}
                  {values.child.emergencyContactPhone}
                </p>
              </div>
            </div>

            <div className="space-y-3 border-t border-border-subtle pt-5">
              <div className="flex items-start gap-3">
                <Controller
                  control={control}
                  name="consent.termsAccepted"
                  render={({ field }) => (
                    <Checkbox
                      id="consent.termsAccepted"
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />
                <Label htmlFor="consent.termsAccepted" className="font-normal leading-relaxed">
                  I have read and agree to the{" "}
                  <Link href="/terms" className="text-gold underline-offset-4 hover:underline">
                    Terms &amp; Conditions
                  </Link>
                  , including the liability and risk waiver, photography
                  consent, and WhatsApp communication notice. *
                </Label>
              </div>
              <FieldError
                id="consent-terms-error"
                message={errors.consent?.termsAccepted?.message}
              />
            </div>

            <div className="rounded-lg border border-gold/30 bg-surface p-4 text-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gold">
                Standing order payment
              </p>
              {programme.price && (
                <p className="mt-2 text-white">{programme.price}</p>
              )}
              <dl className="mt-3 space-y-1 text-muted">
                <div className="flex justify-between gap-3">
                  <dt>Account name</dt>
                  <dd className="text-white">
                    {standingOrderDetails.accountName}
                  </dd>
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
                  <dd className="text-white">
                    {standingOrderDetails.accountNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Reference</dt>
                  <dd className="text-white">
                    {standingOrderDetails.referenceNote}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex items-start gap-3 border-t border-border-subtle pt-4">
                <Controller
                  control={control}
                  name="consent.paymentAgreementAccepted"
                  render={({ field }) => (
                    <Checkbox
                      id="consent.paymentAgreementAccepted"
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />
                <Label
                  htmlFor="consent.paymentAgreementAccepted"
                  className="font-normal leading-relaxed"
                >
                  I agree to set up a standing order for this programme as
                  described in the{" "}
                  <Link href="/terms" className="text-gold underline-offset-4 hover:underline">
                    payment terms
                  </Link>
                  . *
                </Label>
              </div>
              <FieldError
                id="consent-payment-error"
                message={errors.consent?.paymentAgreementAccepted?.message}
              />
            </div>

            {submitError && (
              <p role="alert" className="text-sm text-red-300">
                {submitError}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button type="button" variant="secondary" onClick={goBack}>
                Back
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Registration"}
              </Button>
            </div>
          </section>
        )}

        {step === 5 && result && (
          <section className="rounded-xl border border-border-subtle bg-card p-8 text-center">
            <CheckCircle2
              aria-hidden
              className="mx-auto size-12 text-gold"
              strokeWidth={1.5}
            />
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white">
              {result.demo ? "Demo Submission Received" : "Registration Received"}
            </h2>
            {result.demo && (
              <p className="mx-auto mt-3 max-w-md rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
                This was a demo submission. No real registration has been
                made, please contact us directly to secure your child&apos;s
                place until our registration backend is live.
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
                  <dd className="text-white">
                    {standingOrderDetails.accountName}
                  </dd>
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
                  <dd className="text-white">
                    {standingOrderDetails.accountNumber}
                  </dd>
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
            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/programmes">Back to Programmes</Link>
              </Button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
