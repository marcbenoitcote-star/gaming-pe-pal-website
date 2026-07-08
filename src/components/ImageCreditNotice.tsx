import Link from "next/link";

export function ImageCreditNotice() {
  return (
    <p className="text-sm leading-6 text-slate-400">
      Les images incluses doivent rester sourcées, créditées et non trompeuses. Consulte les{" "}
      <Link href="/credits" className="font-medium text-reef-300 hover:text-white">
        crédits images
      </Link>{" "}
      avant d'ajouter de nouveaux assets.
    </p>
  );
}
