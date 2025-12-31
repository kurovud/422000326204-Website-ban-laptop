import { formatPrice } from './formatPrice.js'

export const fallbackProducts = [
  { id: 'lap-ultra', sku: 'LAP-UX3402', name: 'Laptop Ultrabook 14" Evo i5', type: 'laptop', price: 19990000 },
  { id: 'lap-game', sku: 'LAP-RTX4060', name: 'Laptop Gaming RTX 4060 6GB', type: 'laptop', price: 32990000 },
  { id: 'pc-game', sku: 'PC-GAMING-4060', name: 'PC Gaming Ryzen 5 + RTX 4060', type: 'pc', price: 25990000 },
  { id: 'pc-work', sku: 'PC-WORK-4070', name: 'PC Designer i7 + RTX 4070', type: 'pc', price: 42990000 },
  { id: 'cpu-13400f', sku: 'CPU-I5-13400F', name: 'CPU Intel Core i5-13400F', type: 'component', price: 5200000 },
  { id: 'main-b760', sku: 'MAIN-B760M', name: 'Mainboard B760M WiFi DDR5', type: 'component', price: 3690000 },
  { id: 'ram-ddr5', sku: 'RAM-16-6000', name: 'RAM DDR5 16GB 6000MHz', type: 'component', price: 1890000 },
  { id: 'vga-4060', sku: 'VGA-RTX4060', name: 'VGA RTX 4060 8GB', type: 'component', price: 7990000 },
  { id: 'ssd-1tb', sku: 'SSD-1TB-PCIE4', name: 'SSD NVMe 1TB PCIe 4.0', type: 'component', price: 2490000 },
  { id: 'psu-750', sku: 'PSU-750G', name: 'PSU 750W 80+ Gold', type: 'component', price: 2190000 },
]

const buildChecklist = [
  'Kiểm tra socket CPU và chipset mainboard (ví dụ: Intel 1700 với B760, AMD AM5 với B650).',
  'RAM phải khớp chuẩn mainboard (DDR4/DDR5) và ưu tiên bus cao nếu dùng iGPU.',
  'Chọn PSU công suất đủ headroom 20-30% so với TDP cấu hình, ưu tiên 80 Plus Gold.',
  'Đảm bảo GPU và tản khí/AIO vừa với case (chiều dài, chiều cao radiator).',
  'Cập nhật BIOS, cài driver VGA/Chipset và kiểm tra XMP/EXPO sau khi lắp.',
]

function pickProducts(products, type, limit = 3) {
  return products.filter(p => p.type === type).slice(0, limit)
}

function formatList(title, list) {
  if (!list.length) return ''
  const lines = list.map(p => `• ${p.name} (${p.sku || p.id}) — ${formatPrice(p.price)}`)
  return `${title}\n${lines.join('\n')}`
}

function buildPcKit(products) {
  const cpu = products.find(p => p.name.toLowerCase().includes('cpu')) || products.find(p => p.type === 'component')
  const gpu = products.find(p => p.name.toLowerCase().includes('vga') || p.name.toLowerCase().includes('rtx'))
  const ram = products.find(p => p.name.toLowerCase().includes('ram'))
  const ssd = products.find(p => p.name.toLowerCase().includes('ssd'))
  const psu = products.find(p => p.name.toLowerCase().includes('psu') || p.name.toLowerCase().includes('nguồn'))

  const picks = [cpu, gpu, ram, ssd, psu].filter(Boolean)
  if (!picks.length) return ''
  return formatList('Combo tham khảo', picks)
}

export function generateAssistantReply(question, productPool = []) {
  const q = question.toLowerCase()
  const products = productPool.length ? productPool : fallbackProducts
  const reply = []

  if (q.includes('build') || q.includes('lắp') || q.includes('cấu hình')) {
    reply.push('Hướng dẫn build PC chuẩn TechShop:')
    reply.push(buildChecklist.map((c, i) => `${i + 1}. ${c}`).join('\n'))
    reply.push(buildPcKit(products))
  }

  if (q.includes('laptop') || q.includes('notebook') || q.includes('xách tay')) {
    const laptopList = pickProducts(products, 'laptop', 3)
    reply.push(formatList('Gợi ý laptop theo nhu cầu', laptopList))
    reply.push('Tiêu chí chọn laptop: CPU/ram >= 16GB cho đa nhiệm, ổ SSD NVMe, màn IPS 100% sRGB cho thiết kế; gaming ưu tiên GPU rời, tản nhiệt hai quạt.')
  }

  if (q.includes('gaming')) {
    reply.push('Định hướng gaming: ưu tiên GPU mạnh (RTX 4060/4070), CPU 6-8 nhân, RAM 16-32GB, SSD 1TB. Nên chọn màn 144-240Hz và PSU 650W+.')
  }

  if (q.includes('đồ họa') || q.includes('render') || q.includes('ai')) {
    reply.push('Cấu hình render/AI: CPU nhiều nhân (i7/Ryzen 7), RAM 32GB+, SSD PCIe 4.0, GPU VRAM 8GB trở lên. Ưu tiên mainboard có nhiều khe M.2 và nguồn 750W.')
  }

  if (q.includes('linh kiện') || q.includes('ram') || q.includes('ssd') || q.includes('gpu') || q.includes('card')) {
    const parts = pickProducts(products, 'component', 4)
    reply.push(formatList('Linh kiện đề xuất', parts))
  }

  if (!reply.length) {
    const topProducts = products.slice(0, 3)
    reply.push(formatList('Gợi ý nhanh', topProducts))
    reply.push('Bạn có thể hỏi: "Build PC gaming 25 triệu", "So sánh laptop học tập và gaming", hoặc "Linh kiện nào tương thích với i5-13400F?".')
  }

  return reply.filter(Boolean).join('\n\n')
}
