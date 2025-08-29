import fs from 'fs'
import path from 'path'

describe('Starfield CSS animations', () => {
  const css = fs.readFileSync(
    path.resolve(__dirname, '../../app/globals.css'),
    'utf8'
  )

  test('contains twinkling star animation', () => {
    expect(css).toMatch(/@keyframes\s+star-twinkle/)
    expect(css).toMatch(/animation:\s*star-twinkle/)
  })

  test('contains shooting star animation', () => {
    expect(css).toMatch(/@keyframes\s+shooting-star/)
    expect(css).toMatch(/animation:\s*shooting-star/)
  })
})
