import { serverConfig } from "@/data/serverConfig";

export function RaidWindowTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Fenêtres de raid du serveur Gaming P&E Pal</caption>
        <thead className="bg-white/[0.08] text-slate-200">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Jour
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Heures
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Fuseau
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {serverConfig.raidWindows.map((window) => (
            <tr key={window.day} className="bg-night-800/70">
              <th scope="row" className="px-4 py-3 font-semibold text-white">
                {window.day}
              </th>
              <td className="px-4 py-3 text-slate-300">{window.hours}</td>
              <td className="px-4 py-3 text-slate-300">{window.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
