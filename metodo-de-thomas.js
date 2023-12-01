/* eslint-disable space-before-function-paren */
export default function MetodoDeThomas(a, b, c, d) {
  const n = a.length
  a = a.map(value => parseFloat(value))
  b = b.map(value => parseFloat(value))
  c = c.map(value => parseFloat(value))
  d = d.map(value => parseFloat(value))
  // Verificar si el sistema es invertible
  for (let i = 0; i < n; i++) {
    if (i < n - 1 && (a[i + 1] === null || isNaN(a[i + 1]) || a[i + 1] === 0)) {
      throw new Error('El sistema no es invertible. División por cero o elemento vacío en la diagonal superior.')
    }
    if (b[i] === null || isNaN(b[i]) || b[i] === 0) {
      throw new Error('El sistema no es invertible. División por cero o elemento vacío en la diagonal principal.')
    }
    if (i > 0 && (c[i - 1] === null || isNaN(c[i - 1]) || c[i - 1] === 0)) {
      throw new Error('El sistema no es invertible. División por cero o elemento vacío en la diagonal inferior.')
    }
    if (d[i] === null || isNaN(d[i])) {
      throw new Error('Elemento null en los términos independientes.')
    }
  }

  const cl = Array(n).fill(0)
  const dl = Array(n).fill(0)
  const x = Array(n).fill(0)

  cl[0] = c[0] / b[0]
  for (let i = 1; i < n - 1; i++) {
    cl[i] = c[i] / (b[i] - a[i] * cl[i - 1])
  }

  dl[0] = d[0] / b[0]
  for (let i = 1; i < n; i++) {
    dl[i] = (d[i] - a[i] * dl[i - 1]) / (b[i] - a[i] * cl[i - 1])
  }

  x[n - 1] = dl[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    x[i] = dl[i] - cl[i] * x[i + 1]
  }

  return x
}
