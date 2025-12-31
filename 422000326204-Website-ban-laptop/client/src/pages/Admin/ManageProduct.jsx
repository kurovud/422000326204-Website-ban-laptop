import { useEffect, useMemo, useState } from 'react'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../services/product.service.js'
import { formatPrice } from '../../utils/formatPrice.js'

const emptyProduct = { sku: '', name: '', type: 'laptop', price: 0, stock: 0, description: '' }

export default function ManageProduct() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await getProducts({ q, type })
      setItems(res.data || [])
      setMessage(null)
    } catch (e) {
      setMessage({ type: 'error', text: 'Không tải được danh sách sản phẩm' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [q, type])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.sku || !form.name) return
    if (form.price < 0 || form.stock < 0) {
      setMessage({ type: 'error', text: 'Giá và tồn kho phải lớn hơn hoặc bằng 0' })
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        await updateProduct(editingId, form)
        setMessage({ type: 'success', text: 'Cập nhật sản phẩm thành công' })
      } else {
        await createProduct(form)
        setMessage({ type: 'success', text: 'Thêm sản phẩm thành công' })
      }
      setForm(emptyProduct)
      setEditingId(null)
      await load()
    } catch (err) {
      setMessage({ type: 'error', text: 'Lưu sản phẩm thất bại, vui lòng thử lại' })
    } finally {
      setSaving(false)
    }
  }

  const onEdit = (p) => {
    setEditingId(p.id)
    setForm({
      sku: p.sku,
      name: p.name,
      type: p.type,
      price: p.price,
      stock: p.stock,
      description: p.description || ''
    })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Xoá sản phẩm này?')) return
    setSaving(true)
    try {
      await deleteProduct(id)
      setMessage({ type: 'success', text: 'Đã xoá sản phẩm' })
      await load()
    } catch (e) {
      setMessage({ type: 'error', text: 'Không xoá được sản phẩm' })
    } finally {
      setSaving(false)
    }
  }

  const grouped = useMemo(() => {
    const map = { laptop: [], pc: [], component: [] }
    items.forEach((p) => map[p.type]?.push(p))
    return map
  }, [items])

  const stats = useMemo(() => {
    const totalValue = items.reduce((sum, p) => sum + Number(p.price) * Number(p.stock), 0)
    return [
      { title: 'Tổng sản phẩm', value: items.length },
      { title: 'Tồn kho', value: items.reduce((sum, p) => sum + Number(p.stock), 0) },
      { title: 'Giá trị tồn kho', value: formatPrice(totalValue) },
    ]
  }, [items])

  return (
    <div className="card">
      <h2>Quản lý sản phẩm</h2>
      <p className="muted">Tạo, cập nhật, xoá sản phẩm; quản lý tồn kho và giá trị danh mục.</p>

      {message && <div className={`alert ${message.type}`}>{message.text}</div>}

      <div className="grid" style={{ marginBottom: 12 }}>
        {stats.map((s) => (
          <div key={s.title} className="service-card">
            <div className="muted">{s.title}</div>
            <h3 style={{ margin: '6px 0 0' }}>{s.value}</h3>
          </div>
        ))}
      </div>

      <form className="surface" style={{ margin: '12px 0' }} onSubmit={onSubmit}>
        <div className="row">
          <input className="input" placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} required />
          <input className="input" placeholder="Tên sản phẩm" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <select className="input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="laptop">Laptop</option>
            <option value="pc">PC</option>
            <option value="component">Linh kiện</option>
          </select>
        </div>
        <div className="row">
          <input className="input" type="number" min={0} placeholder="Giá" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required />
          <input className="input" type="number" min={0} placeholder="Tồn kho" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} required />
        </div>
        <textarea className="textarea" rows={3} placeholder="Mô tả" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(emptyProduct); setEditingId(null) }}>Huỷ</button>}
          <button className="btn btn-primary" type="submit" disabled={saving}>{editingId ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
        </div>
      </form>

      <div className="row" style={{ marginBottom: 10 }}>
        <input className="input" placeholder="Tìm theo tên/SKU" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" style={{ width: 200 }} value={type} onChange={e => setType(e.target.value)}>
          <option value="">Tất cả</option>
          <option value="laptop">Laptop</option>
          <option value="pc">PC</option>
          <option value="component">Linh kiện</option>
        </select>
      </div>

      {loading && <div className="muted">Đang tải dữ liệu...</div>}

      {['laptop', 'pc', 'component'].map((t) => (
        <div key={t} style={{ marginTop: 12 }}>
          <h4 style={{ marginBottom: 8 }}>{t.toUpperCase()}</h4>
          <div className="card" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                  <th style={{ padding: 10 }}>SKU</th>
                  <th style={{ padding: 10 }}>Tên</th>
                  <th style={{ padding: 10 }}>Giá</th>
                  <th style={{ padding: 10 }}>Tồn kho</th>
                  <th style={{ padding: 10 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {grouped[t].map((p) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                    <td style={{ padding: 10 }}>{p.sku}</td>
                    <td style={{ padding: 10 }}>{p.name}</td>
                    <td style={{ padding: 10 }}>{formatPrice(p.price)}</td>
                    <td style={{ padding: 10 }}>{p.stock}</td>
                    <td style={{ padding: 10, display: 'flex', gap: 8 }}>
                      <button className="btn btn-outline" onClick={() => onEdit(p)}>Sửa</button>
                      <button className="btn btn-primary" onClick={() => onDelete(p.id)}>Xoá</button>
                    </td>
                  </tr>
                ))}
                {!grouped[t].length && (
                  <tr>
                    <td colSpan={5} style={{ padding: 10, color: '#64748b' }}>Chưa có sản phẩm.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
