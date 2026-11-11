"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, ShieldAlert } from "lucide-react";
import type { Camp } from "@/types";
import {
  bookingFormSchema,
  type BookingFormValues,
} from "@/lib/validation/booking";
import { formatDateRange, formatPrice } from "@/lib/utils";
import { bookingBackendConfigured } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";
import { BookingStepper } from "@/components/booking/booking-stepper";

type Step = 1 | 2 | 3 | 4 | 5;

export function BookingForm({ camp }: { camp: Camp }) {
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
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      campSlug: camp.slug,
      parent: { fullName: "", email: "", phone: "" },
      player: {
        fullName: "",
        dateOfBirth: "",
        medicalInfo: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
      },
      consent: { privacyAccepted: false as unknown as true, photoConsent: false },
    },
  });

  async function goNext() {
    if (step === 2) {
      const valid = await trigger(["parent.fullName", "parent.email", "parent.phone"]);
      if (!valid) return;
    }
    if (step === 3) {
      const valid = await trigger([
        "player.fullName",
        "player.dateOfBirth",
        "player.emergencyContactName",
        "player.emergencyContactPhone",
      ]);
      if (!valid) return;
    }
    setStep((s) => Math.min(5, s + 1) as Step);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1) as Step);
  }

  async function onSubmit(values: BookingFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
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
        "We couldn't reach the booking service. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const values = getValues();

  return (
    <div>
      <BookingStepper current={step} />

      {!bookingBackendConfigured && step < 5 && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong className="font-semibold">Demo mode:</strong> our secure
            booking backend isn&apos;t connected yet, so submissions here are
            not real reservations. Contact us directly to confirm a place.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("campSlug")} />

        {step === 1 && (
          <section className="rounded-xl border border-border-subtle bg-card p-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {camp.name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <CalendarDays aria-hidden className="size-4 text-gold" />
              {formatDateRange(camp.sessionDates)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {camp.description}
            </p>
            <div className="mt-5 flex items-center justify-between rounded-lg border border-border-subtle bg-surface px-4 py-3">
              <span className="text-sm text-muted">Total price</span>
              <span className="font-display text-xl font-bold text-gold">
                {formatPrice(camp.pricePence)}
              </span>
            </div>
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
              Player Information
            </h2>
            <div>
              <Label htmlFor="player.fullName">Player&apos;s full name</Label>
              <Input
                id="player.fullName"
                className="mt-1.5"
                aria-invalid={!!errors.player?.fullName}
                aria-describedby="player.fullName-error"
                {...register("player.fullName")}
              />
              <FieldError
                id="player.fullName-error"
                message={errors.player?.fullName?.message}
              />
            </div>
            <div>
              <Label htmlFor="player.dateOfBirth">Date of birth</Label>
              <Input
                id="player.dateOfBirth"
                type="date"
                className="mt-1.5"
                aria-invalid={!!errors.player?.dateOfBirth}
                aria-describedby="player.dateOfBirth-error"
                {...register("player.dateOfBirth")}
              />
              <FieldError
                id="player.dateOfBirth-error"
                message={errors.player?.dateOfBirth?.message}
              />
            </div>
            <div>
              <Label htmlFor="player.medicalInfo">
                Medical or accessibility information{" "}
                <span className="font-normal normal-case text-muted">
                  (optional, only if relevant)
                </span>
              </Label>
              <Textarea
                id="player.medicalInfo"
                className="mt-1.5"
                placeholder="e.g. allergies, conditions coaches should be aware of"
                {...register("player.medicalInfo")}
              />
              <p className="mt-1.5 text-xs text-muted">
                This information is only used to keep your child safe during
                sessions and is handled with restricted access.
              </p>
            </div>
            <div>
              <Label htmlFor="player.emergencyContactName">
                Emergency contact name
              </Label>
              <Input
                id="player.emergencyContactName"
                className="mt-1.5"
                aria-invalid={!!errors.player?.emergencyContactName}
                aria-describedby="player.emergencyContactName-error"
                {...register("player.emergencyContactName")}
              />
              <FieldError
                id="player.emergencyContactName-error"
                message={errors.player?.emergencyContactName?.message}
              />
            </div>
            <div>
              <Label htmlFor="player.emergencyContactPhone">
                Emergency contact phone
              </Label>
              <Input
                id="player.emergencyContactPhone"
                type="tel"
                className="mt-1.5"
                aria-invalid={!!errors.player?.emergencyContactPhone}
                aria-describedby="player.emergencyContactPhone-error"
                {...register("player.emergencyContactPhone")}
              />
              <FieldError
                id="player.emergencyContactPhone-error"
                message={errors.player?.emergencyContactPhone?.message}
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

        {step === 4 && (
          <section className="space-y-6 rounded-xl border border-border-subtle bg-card p-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Review Booking
            </h2>

            <div className="space-y-4 text-sm">
              <div className="rounded-lg border border-border-subtle bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  Camp
                </p>
                <p className="mt-1 text-white">{camp.name}</p>
                <p className="text-muted">{formatDateRange(camp.sessionDates)}</p>
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
                  Player
                </p>
                <p className="mt-1 text-white">{values.player.fullName}</p>
                <p className="text-muted">
                  Date of birth: {values.player.dateOfBirth}
                </p>
                <p className="text-muted">
                  Emergency contact: {values.player.emergencyContactName} &middot;{" "}
                  {values.player.emergencyContactPhone}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-surface p-4">
                <span className="text-muted">Total amount</span>
                <span className="font-display text-xl font-bold text-gold">
                  {formatPrice(camp.pricePence)}
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-border-subtle pt-5">
              <div className="flex items-start gap-3">
                <Controller
                  control={control}
                  name="consent.privacyAccepted"
                  render={({ field }) => (
                    <Checkbox
                      id="consent.privacyAccepted"
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />
                <Label htmlFor="consent.privacyAccepted" className="font-normal leading-relaxed">
                  I have read and accept the{" "}
                  <Link href="/privacy" className="text-gold underline-offset-4 hover:underline">
                    privacy notice
                  </Link>{" "}
                  and understand how my child&apos;s information will be used. *
                </Label>
              </div>
              <FieldError
                id="consent-error"
                message={errors.consent?.privacyAccepted?.message}
              />
              <div className="flex items-start gap-3">
                <Controller
                  control={control}
                  name="consent.photoConsent"
                  render={({ field }) => (
                    <Checkbox
                      id="consent.photoConsent"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  )}
                />
                <Label htmlFor="consent.photoConsent" className="font-normal leading-relaxed">
                  I consent to my child being photographed for Let&apos;s Play
                  promotional purposes (optional).
                </Label>
              </div>
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
                {submitting ? "Submitting…" : "Confirm Booking"}
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
              {result.demo ? "Demo Submission Received" : "Booking Confirmed"}
            </h2>
            {result.demo && (
              <p className="mx-auto mt-3 max-w-md rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
                This was a demo submission. No real booking has been made —
                please contact us directly to secure your child&apos;s place
                until our booking backend is live.
              </p>
            )}
            <p className="mt-4 text-sm text-muted">Booking reference</p>
            <p className="font-display text-2xl font-bold tracking-widest text-gold">
              {result.reference}
            </p>
            <div className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-white/80">
              <p>
                <span className="text-muted">Camp:</span> {camp.name}
              </p>
              <p>
                <span className="text-muted">Dates:</span>{" "}
                {formatDateRange(camp.sessionDates)}
              </p>
              <p>
                <span className="text-muted">Total:</span>{" "}
                {formatPrice(camp.pricePence)}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
              A confirmation will be sent to your email once our booking
              system has processed your request. If you have any questions,
              email{" "}
              <a href="mailto:info@letsplay.co.im" className="text-gold hover:underline">
                info@letsplay.co.im
              </a>
              .
            </p>
            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/football-camps">Back to Football Camps</Link>
              </Button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
