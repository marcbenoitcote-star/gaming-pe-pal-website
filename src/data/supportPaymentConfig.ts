import type { SupportPackId } from "@/data/supportPacks";

export type SupportPaymentLinks = Record<SupportPackId, string | null>;

const paymentUrl = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

export const supportPaymentConfig = {
  paypalEmail: "Death-animator@hotmail.com",
  paypal: {
    basic: paymentUrl(process.env.PAYPAL_BASIC_URL),
    intermediate: paymentUrl(process.env.PAYPAL_INTERMEDIATE_URL),
    deluxe: paymentUrl(process.env.PAYPAL_DELUXE_URL)
  } satisfies SupportPaymentLinks,
  stripe: {
    basic: paymentUrl(process.env.STRIPE_BASIC_URL),
    intermediate: paymentUrl(process.env.STRIPE_INTERMEDIATE_URL),
    deluxe: paymentUrl(process.env.STRIPE_DELUXE_URL)
  } satisfies SupportPaymentLinks
};
