export default function EditFormLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="h-9 w-28 bg-slate-200 rounded animate-pulse" />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="space-y-4 max-w-xl">
          <div className="h-10 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-24 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-10 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-10 bg-slate-200 rounded-lg animate-pulse" />
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-20 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-20 bg-slate-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
