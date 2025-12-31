export function formatPrice(v) {
  const n = Number(v || 0)
  return n.toLocaleString('vi-VN') + ' ₫'
}
