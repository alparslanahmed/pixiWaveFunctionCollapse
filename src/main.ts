import './style.scss'
import { setupCanvas } from './Canvas.ts'

const wrapper = document.querySelector<HTMLDivElement>('#app');

wrapper!.innerHTML = `
  <canvas id="canvasWrapper">
  </div>
`

setupCanvas(document.querySelector<HTMLCanvasElement>('#canvasWrapper')!, wrapper!)
