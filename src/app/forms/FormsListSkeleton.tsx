export function FormsListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-10 w-32 rounded-lg bg-slate-200" />
        <div className="h-10 w-24 rounded-lg bg-slate-200" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left">
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-4 w-16 bg-slate-200 rounded" />
              </th>
              <th className="px-4 py-3 text-left">
                <div className="h-4 w-20 bg-slate-200 rounded" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  <div className="h-4 w-48 bg-slate-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
