export function ok(res, data, message = 'OK') {
  return res.json({ message, data })
}

export function created(res, data, message = 'CREATED') {
  return res.status(201).json({ message, data })
}

export function badRequest(res, message = 'Bad Request') {
  return res.status(400).json({ message })
}

export function unauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({ message })
}

export function forbidden(res, message = 'Forbidden') {
  return res.status(403).json({ message })
}

export function notFound(res, message = 'Not Found') {
  return res.status(404).json({ message })
}
