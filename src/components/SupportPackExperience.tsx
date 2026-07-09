"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  ExternalLink,
  Mail,
  PackageCheck,
  ShieldCheck
} from "lucide-react";
import type { SupportPack, SupportPackId } from "@/data/supportPacks";
import type { SupportPaymentLinks } from "@/data/supportPaymentConfig";

type SupportPackExperienceProps = {
  packs: SupportPack[];
  paypalEmail: string;
  paypalLinks: SupportPaymentLinks;
  stripeLinks: SupportPaymentLinks;
};

type RequestForm = {
  email: string;
  steam: string;
  discord: string;
  character: string;
  packId: SupportPackId;
  confirmed: boolean;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-night-900 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-reef-300 focus:ring-2 focus:ring-reef-300/20";

const tones: Record<SupportPackId, { border: string; badge: string; button: string }> = {
  basic: {
    border: "border-white/10",
    badge: "border-reef-300/25 bg-reef-300/10 text-reef-300",
    button: "border-reef-300/30 bg-reef-300/10 text-reef-300 hover:bg-reef-300/15"
  },
  intermediate: {
    border: "border-moss-300/25",
    badge: "border-moss-300/25 bg-moss-300/10 text-moss-300",
    button: "border-moss-300/30 bg-moss-300/10 text-moss-300 hover:bg-moss-300/15"
  },
  deluxe: {
    border: "border-ember-400/50 shadow-ember",
    badge: "border-ember-400/35 bg-ember-500/15 text-ember-400",
    button: "border-ember-400 bg-ember-500 text-night-900 hover:bg-ember-400"
  }
};

export function SupportPackExperience({
  packs,
  paypalEmail,
  paypalLinks,
  stripeLinks
}: SupportPackExperienceProps) {
  const [form, setForm] = useState<RequestForm>({
    email: "",
    steam: "",
    discord: "",
    character: "",
    packId: "basic",
    confirmed: false
  });
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedPack = packs.find((pack) => pack.id === form.packId) ?? packs[0];
  const isComplete =
    form.email.includes("@") &&
    form.steam.trim().length > 0 &&
    form.discord.trim().length > 0 &&
    form.character.trim().length > 0 &&
    form.confirmed;

  const requestSummary = useMemo(
    () =>
      [
        "Demande de pack - Gaming P&E Pal",
        `Pack : ${selectedPack.name} (${selectedPack.price} $)`,
        `Email : ${form.email}`,
        `Steam : ${form.steam}`,
        `Discord : ${form.discord}`,
        `Personnage : ${form.character}`,
        "Confirmation soutien : Oui"
      ].join("\n"),
    [form.character, form.discord, form.email, form.steam, selectedPack]
  );

  const mailtoHref = `mailto:${paypalEmail}?subject=${encodeURIComponent(
    `Demande ${selectedPack.name} - ${form.character || "joueur"}`
  )}&body=${encodeURIComponent(requestSummary)}`;

  const selectPack = (packId: SupportPackId) => {
    setForm((current) => ({ ...current, packId }));
    setPrepared(false);
    document.getElementById("demande-pack")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isComplete) {
      setPrepared(true);
    }
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(requestSummary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const paypalUrl = paypalLinks[form.packId];
  const stripeUrl = stripeLinks[form.packId];
  const hasPaymentLink = Boolean(paypalUrl || stripeUrl);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        {packs.map((pack) => {
          const tone = tones[pack.id];
          const selected = form.packId === pack.id;

          return (
            <article
              key={pack.id}
              className={`relative flex h-full flex-col overflow-hidden rounded-lg border bg-white/[0.05] ${tone.border}`}
            >
              {pack.featured ? (
                <div className="bg-ember-500 px-4 py-2 text-center text-xs font-bold uppercase text-night-900">
                  Soutien maximal
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-semibold ${tone.badge}`}>
                      {pack.shortName}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-white">{pack.name}</h2>
                  </div>
                  <p className="shrink-0 text-3xl font-bold text-white">{pack.price} $</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{pack.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pack.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectPack(pack.id)}
                  className={`mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold transition ${tone.button}`}
                >
                  <PackageCheck className="h-4 w-4" aria-hidden="true" />
                  {selected ? "Pack sélectionné" : `Choisir ${pack.shortName}`}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <section
        id="demande-pack"
        className="mt-12 scroll-mt-24 border-y border-white/10 bg-night-850 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-reef-300">Avant le paiement</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Prépare ta demande</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Ces renseignements permettent de retrouver le paiement et de livrer le bon pack au bon personnage.
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p className="flex gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-ember-400" aria-hidden="true" />
                La livraison est manuelle et peut prendre de 24 à 48 heures.
              </p>
              <p className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-moss-300" aria-hidden="true" />
                Les informations servent uniquement à confirmer le paiement et à livrer le pack.
              </p>
            </div>
          </div>

          <form onSubmit={submitRequest} className="rounded-lg border border-white/10 bg-white/[0.045] p-5 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-200">
                Adresse email
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, email: event.target.value }));
                    setPrepared(false);
                  }}
                  className={inputClass}
                  placeholder="joueur@exemple.com"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Pseudo Steam
                <input
                  type="text"
                  required
                  value={form.steam}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, steam: event.target.value }));
                    setPrepared(false);
                  }}
                  className={inputClass}
                  placeholder="Ton pseudo Steam"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Pseudo Discord
                <input
                  type="text"
                  required
                  value={form.discord}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, discord: event.target.value }));
                    setPrepared(false);
                  }}
                  className={inputClass}
                  placeholder="Ton pseudo Discord"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Personnage en jeu
                <input
                  type="text"
                  required
                  value={form.character}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, character: event.target.value }));
                    setPrepared(false);
                  }}
                  className={inputClass}
                  placeholder="Nom exact du personnage"
                />
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-slate-200">
              Pack choisi
              <select
                value={form.packId}
                onChange={(event) => {
                  setForm((current) => ({ ...current, packId: event.target.value as SupportPackId }));
                  setPrepared(false);
                }}
                className={inputClass}
              >
                {packs.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.name} - {pack.price} $
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-night-900 p-4">
              <input
                type="checkbox"
                required
                checked={form.confirmed}
                onChange={(event) => {
                  setForm((current) => ({ ...current, confirmed: event.target.checked }));
                  setPrepared(false);
                }}
                className="mt-1 h-4 w-4 accent-cyan-300"
              />
              <span className="text-sm leading-6 text-slate-200">
                Je confirme comprendre que ce paiement est une contribution optionnelle servant à soutenir les
                coûts du serveur Gaming P&E Pal.
              </span>
            </label>

            <button
              type="submit"
              disabled={!isComplete}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-reef-300 px-5 py-3 text-sm font-bold text-night-900 transition hover:bg-reef-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              Valider et préparer le paiement
            </button>

            {prepared ? (
              <div className="mt-6 border-t border-white/10 pt-6" aria-live="polite">
                <p className="font-bold text-white">Demande prête pour le pack {selectedPack.shortName}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Envoie le résumé à l'administration, puis utilise une option de paiement disponible.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Envoyer la demande
                  </a>
                  <button
                    type="button"
                    onClick={copySummary}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    {copied ? "Résumé copié" : "Copier le résumé"}
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {paypalUrl ? (
                    <a
                      href={paypalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ember-500 px-4 py-3 text-sm font-bold text-night-900 hover:bg-ember-400"
                    >
                      Payer avec PayPal
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  {stripeUrl ? (
                    <a
                      href={stripeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-moss-300 px-4 py-3 text-sm font-bold text-night-900 hover:bg-moss-400"
                    >
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                      Payer par carte / Stripe
                    </a>
                  ) : null}
                </div>

                {!hasPaymentLink ? (
                  <div className="mt-4 rounded-lg border border-ember-400/25 bg-ember-500/10 p-4">
                    <p className="font-semibold text-ember-400">Paiement bientôt disponible</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Le paiement PayPal sera effectué avec l'adresse{" "}
                      <a className="font-semibold text-white underline" href={`mailto:${paypalEmail}`}>
                        {paypalEmail}
                      </a>
                      . Attends la confirmation de l'administration avant d'envoyer le paiement.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Les informations demandées servent uniquement à identifier le joueur, confirmer le paiement et livrer
              le pack. Elles ne seront pas revendues ni partagées publiquement.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
