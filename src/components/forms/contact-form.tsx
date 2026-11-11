"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import {
  contactFormSchema,
  enquiryTypes,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { contactBackendConfigured, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { FieldError } from "@/components/ui/field";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetEnquiry = searchParams.get("enquiry");
  const defaultEnquiry = enquiryTypes.includes(presetEnquiry as (typeof enquiryTypes)[number])
    ? (presetEnquiry as (typeof enquiryTypes)[number])
    : "General Enquiry";

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiryType: defaultEnquiry,
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(
          data.error ??
            "Something went wrong sending your message. Please try again or contact us directly."
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "We couldn't reach our servers. Please try again or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border-subtle bg-card p-8 text-center">
        <CheckCircle2
          aria-hidden
          className="mx-auto size-12 text-gold"
          strokeWidth={1.5}
        />
        <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-white">
          Message sent
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thanks for getting in touch, we&apos;ll reply as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <div>
      {!contactBackendConfigured && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong className="font-semibold">Form submission unavailable:</strong>{" "}
            our contact form isn&apos;t connected to an email service yet.
            Please email{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>{" "}
            or call{" "}
            <a href={siteConfig.phoneHref} className="underline">
              {siteConfig.phone}
            </a>{" "}
            instead.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot field — hidden from real users, bots often fill every field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="mt-1.5"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              {...register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone">
              Phone{" "}
              <span className="font-normal text-muted">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              className="mt-1.5"
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
              {...register("phone")}
            />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
          <div>
            <Label htmlFor="enquiryType">Enquiry type</Label>
            <Select
              id="enquiryType"
              className="mt-1.5"
              aria-invalid={!!errors.enquiryType}
              aria-describedby="enquiryType-error"
              {...register("enquiryType")}
            >
              {enquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <FieldError
              id="enquiryType-error"
              message={errors.enquiryType?.message}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            className="mt-1.5"
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby="message-error"
            {...register("message")}
          />
          <FieldError id="message-error" message={errors.message?.message} />
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-300">
            {submitError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
