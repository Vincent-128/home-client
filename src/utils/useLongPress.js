import { useCallback, useRef } from 'react'

const on = (obj, ...args) => {
    if (obj && obj.addEventListener) {
        obj.addEventListener(...args)
    }
}

const off = (obj, ...args) => {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(...args)
    }
}
const preventDefault = ev => {
    if (!('touches' in ev)) return

    if (ev.touches.length < 2 && ev.preventDefault) {
        ev.preventDefault()
    }
}

const useLongPress = (callback, { isPreventDefault = true, delay = 500 } = {}) => {
    const timeout = useRef()
    const target = useRef()

    const start = useCallback(
        event => {
            if (isPreventDefault && event.target) {
                on(event.target, 'touchend', preventDefault, { passive: false })
                target.current = event.target
            }
            timeout.current = setTimeout(() => callback(event), delay)
        },
        [callback, delay, isPreventDefault]
    )

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current)
        if (isPreventDefault && target.current) {
            off(target.current, 'touchend', preventDefault)
        }
    }, [isPreventDefault])

    return {
        onMouseDown: e => start(e),
        onTouchStart: e => start(e),
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear,
    }
}

export default useLongPress
