import {
  DeviceTypeChangePayload,
  enterFullscreen,
  exitFullscreen,
  FullscreenChangePayload,
  getBrowser,
  getMouse,
  LeftMouseButtonDownPayload,
  LeftMouseButtonUpPayload,
  listeners,
  lockKeys,
  lockOrientation,
  lockPointer,
  MiddleMouseButtonDownPayload,
  MiddleMouseButtonUpPayload,
  MouseMovePayload,
  MouseScrollPayload,
  PageFocusChangePayload,
  PageVisibilityPayload,
  PointerLockChangePayload,
  ResizePayload,
  RightMouseButtonDownPayload,
  RightMouseButtonUpPayload,
  ScreenOrientationChangePayload,
  unlockKeys,
  unlockOrientation,
  unlockPointer,
} from '@manapotion/vanilla'

import { DiscordIcon, GitHubIcon, TwitterIcon } from './components/icons'
import Item from './components/Item'
import html from './html'

const getLabelValue = (value: boolean) =>
  value === true ? 'Yes' : value === false ? 'No' : 'Unknown'

const getLabelClass = (value: boolean) =>
  `label ${value === true ? 'label--positive' : value === false ? 'label--negative' : 'label--unknown'}`

document.addEventListener('DOMContentLoaded', () => {
  const mouseLeft = document.getElementById('mouse-left')!
  mouseLeft.textContent = getLabelValue(false)
  mouseLeft.className = getLabelClass(false)

  const mouseMiddle = document.getElementById('mouse-middle')!
  mouseMiddle.textContent = getLabelValue(false)
  mouseMiddle.className = getLabelClass(false)

  const mouseRight = document.getElementById('mouse-right')!
  mouseRight.textContent = getLabelValue(false)
  mouseRight.className = getLabelClass(false)

  listeners({
    onFullscreenChange: ({ isFullscreen }: FullscreenChangePayload) => {
      const el = document.getElementById('isFullscreen')!
      const btn = document.getElementById('fullscreenButton')!
      el.textContent = getLabelValue(isFullscreen)
      el.className = getLabelClass(isFullscreen)
      btn.textContent = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
    },
    onPageVisibilityChange: ({ isPageVisible }: PageVisibilityPayload) => {
      const el = document.getElementById('isPageVisible')!
      el.textContent = getLabelValue(isPageVisible)
      el.className = getLabelClass(isPageVisible)
    },
    onPageFocusChange: ({ isPageFocused }: PageFocusChangePayload) => {
      const el = document.getElementById('isPageFocused')!
      el.textContent = getLabelValue(isPageFocused)
      el.className = getLabelClass(isPageFocused)
    },
    onDeviceTypeChange: ({ isDesktop, isMobile }: DeviceTypeChangePayload) => {
      const elDesktop = document.getElementById('isDesktop')!
      elDesktop.textContent = getLabelValue(isDesktop)
      elDesktop.className = getLabelClass(isDesktop)

      const elMobile = document.getElementById('isMobile')!
      elMobile.textContent = getLabelValue(isMobile)
      elMobile.className = getLabelClass(isMobile)
    },
    onScreenOrientationChange: ({ isPortrait, isLandscape }: ScreenOrientationChangePayload) => {
      const elPortrait = document.getElementById('isPortrait')!
      elPortrait.textContent = getLabelValue(isPortrait)
      elPortrait.className = getLabelClass(isPortrait)

      const elLandscape = document.getElementById('isLandscape')!
      elLandscape.textContent = getLabelValue(isLandscape)
      elLandscape.className = getLabelClass(isLandscape)
    },
    onResize: ({ width, height }: ResizePayload) => {
      const el = document.getElementById('windowSize')!
      el.textContent = `${width}x${height}`
    },
    onPointerLockChange: ({ isPointerLocked }: PointerLockChangePayload) => {
      const el = document.getElementById('isMouseLocked')!
      el.textContent = getLabelValue(isPointerLocked)
      el.className = getLabelClass(isPointerLocked)
      const btn = document.getElementById('mouseLockButton')!
      btn.textContent = isPointerLocked ? 'Unlock' : 'Lock'
    },
    onLeftMouseButtonDown: (_: LeftMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-left')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onMiddleMouseButtonDown: (_: MiddleMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-middle')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onRightMouseButtonDown: (_: RightMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-right')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onLeftMouseButtonUp: (_: LeftMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-left')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onMiddleMouseButtonUp: (_: MiddleMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-middle')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onRightMouseButtonUp: (_: RightMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-right')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onMouseMove: ({ position, movement }: MouseMovePayload) => {
      const elPos = document.getElementById('mouse-position')!
      elPos.textContent = `${position.x}, ${position.y}`

      const elMove = document.getElementById('mouse-movement')!
      elMove.textContent = `${movement.x}, ${movement.y}`
    },
    onScroll: ({ y }: MouseScrollPayload) => {
      const el = document.getElementById('mouse-scroll-y')!
      el.textContent = String(Math.round(y))
    },
  })
})

// @ts-expect-error should define this function in the global scope
window.handleToggleFullscreen = () =>
  getBrowser().isFullscreen ? exitFullscreen() : enterFullscreen()
// @ts-expect-error should define this function in the global scope
window.handleTogglePointerLock = () => (getMouse().locked ? unlockPointer() : lockPointer())
// @ts-expect-error should define this function in the global scope
window.lockOrientation = lockOrientation
// @ts-expect-error should define this function in the global scope
window.unlockOrientation = unlockOrientation
// @ts-expect-error should define this function in the global scope
window.lockKeys = lockKeys
// @ts-expect-error should define this function in the global scope
window.unlockKeys = unlockKeys

export const App = html`
  <main class="mx-auto max-w-7xl px-5 pb-16 pt-5" oncontextmenu="event.preventDefault()">
    <div class="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <img src="/mana-potion.webp" class="w-28" alt="Logo" />
      <div class="flex flex-col gap-3">
        <h1 class="text-center text-5xl font-medium sm:text-left">Mana Potion</h1>
        <h2 class="max-w-lg text-pretty text-center text-lg text-gray-200 sm:text-left">
          Toolkit for JavaScript game development and interactive experiences with
          <a class="underline" href="https://manapotion.org">React</a>,
          <a class="underline" href="https://vue.manapotion.org">Vue</a>,
          <a class="underline" href="https://svelte.manapotion.org">Svelte</a>, and
          <b>vanilla JS</b>
          support.
        </h2>
        <div class="flex items-center justify-center gap-3 sm:justify-start">
          <a
            href="https://github.com/verekia/manapotion"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${GitHubIcon} GitHub
          </a>
          <a
            href="https://twitter.com/verekia"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${TwitterIcon} Twitter
          </a>
          <a
            href="https://discord.gg/VXYxGrP8EJ"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${DiscordIcon} Discord
          </a>
        </div>
      </div>
    </div>
    <div class="mt-10 text-gray-200">
      <div>⚡️ <b>Reactive</b> (re-renders components on changes)</div>
      <div>🗿 <b>Non-reactive</b> (managed by events or animation frame)</div>
    </div>

    <div class="cols-1 mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <section>
        <h2 class="section-heading">🌐 Browser</h2>
        ${Item({
          name: 'isFullscreen',
          label: html`<span id="isFullscreen"></span>`,
          extra: html`<button
            id="fullscreenButton"
            class="btn"
            onclick="window.handleToggleFullscreen()"
          ></button>`,
        })}
        ${Item({
          name: 'isPageVisible',
          label: html`<span id="isPageVisible"></span>`,
        })}
        ${Item({
          name: 'isPageFocused',
          label: html`<span id="isPageFocused"></span>`,
        })}
        ${Item({
          name: 'isDesktop',
          label: html`<span id="isDesktop"></span>`,
        })}
        ${Item({
          name: 'isMobile',
          label: html`<span id="isMobile"></span>`,
        })}
        ${Item({
          name: 'isPortrait',
          label: html`<span id="isPortrait"></span>`,
          extra: html`<span class="text-sm">Ratio-based</span>`,
        })}
        ${Item({
          name: 'isLandscape',
          label: html`<span id="isLandscape"></span>`,
          extra: html`<span class="text-sm">Ratio-based</span>`,
        })}
        ${Item({
          name: 'width,height',
          value: html`<span id="windowSize" class="tabular-nums"></span>`,
        })}
        <div class="mt-2">
          <h2>Force mobile orientation (use after fullscreen)</h2>
          <div class="flex flex-wrap gap-2">
            <button class="btn" onclick="window.lockOrientation('landscape')">Landscape</button>
            <button class="btn" onclick="window.lockOrientation('portrait')">Portrait</button>
            <button class="btn" onclick="window.unlockOrientation()">Unlock orientation</button>
          </div>
        </div>
        <div class="mt-2">
          <h2>Keyboard lock (use after fullscreen on desktop)</h2>
          <div class="flex flex-wrap gap-2">
            <button
              class="btn"
              onclick="window.lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])"
            >
              Lock Esc and WASD
            </button>
            <button class="btn" onclick="window.unlockKeys()">Release keys</button>
          </div>
        </div>
      </section>
      <section>
        <h2 class="section-heading">🖱️ Mouse</h2>
        ${Item({
          name: 'locked',
          label: html`<span id="isMouseLocked"></span>`,
          extra: html`<button
            id="mouseLockButton"
            class="btn"
            onclick="window.handleTogglePointerLock()"
          >
            Lock
          </button>`,
        })}
        ${Item({
          name: 'buttons.left',
          label: html`<span id="mouse-left"></span>`,
        })}
        ${Item({
          name: 'buttons.middle',
          label: html`<span id="mouse-middle"></span>`,
        })}
        ${Item({
          name: 'buttons.right',
          label: html`<span id="mouse-right"></span>`,
        })}
        ${Item({
          name: 'position',
          value: html`<span id="mouse-position" class="tabular-nums"></span>`,
        })}
        ${Item({
          name: 'movement',
          value: html`<span id="mouse-movement" class="tabular-nums"></span>`,
        })}
        ${Item({
          name: 'wheel.y',
          value: html`<span id="mouse-scroll-y" class="tabular-nums"></span>`,
        })}
      </section>
    </div>
  </main>
`