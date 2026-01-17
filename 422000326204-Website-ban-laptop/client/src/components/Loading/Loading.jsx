export default function Loading() {
  return (
    <div className="card flex items-center justify-center p-6">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
        Đang tải dữ liệu...
      </div>
    </div>
  )
}
