export function parseYYYYMMDD(dateStr: string): Date | null {
  const parts = dateStr.split(/[-/]/)
  if (parts.length !== 3) return null
  const [yyyy, mm, dd] = parts
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd))
}

export function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${yyyy}/${mm}/${dd}` // ✅ YYYY/MM/DD
}