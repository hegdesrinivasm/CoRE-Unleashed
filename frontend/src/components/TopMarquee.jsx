import { useEffect, useRef, useState } from "react"

const MarqueeMessage = () => (
  <p className="top-marquee-message">
    Registrations now end on March
    <span className="top-marquee-number">31st</span>
    !
  </p>
)

export default function TopMarquee() {
  const marqueeRef = useRef(null)
  const sampleMessageRef = useRef(null)
  const [messagesPerGroup, setMessagesPerGroup] = useState(6)

  useEffect(() => {
    const updateMessageCount = () => {
      if (!marqueeRef.current || !sampleMessageRef.current) {
        return
      }

      const marqueeWidth = marqueeRef.current.offsetWidth
      const messageWidth = sampleMessageRef.current.offsetWidth

      if (!messageWidth) {
        return
      }

      // Ensure each group is wider than the viewport so duplicated groups loop seamlessly.
      const nextCount = Math.max(2, Math.ceil(marqueeWidth / messageWidth) + 2)
      setMessagesPerGroup((previous) => (previous === nextCount ? previous : nextCount))
    }

    updateMessageCount()

    const observer = new ResizeObserver(updateMessageCount)
    if (marqueeRef.current) {
      observer.observe(marqueeRef.current)
    }

    window.addEventListener("resize", updateMessageCount)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateMessageCount)
    }
  }, [])

  const messageIndexes = Array.from({ length: messagesPerGroup }, (_, index) => index)

  return (
    <div className="top-marquee-shell">
      <span className="sr-only">Registrations for CoRE Unleashed have closed! Thank you for participating!</span>

      <div className="top-marquee" aria-hidden="true" ref={marqueeRef}>
        <p className="top-marquee-message top-marquee-measure" ref={sampleMessageRef}>
          Registrations now end on March
          <span className="top-marquee-number">31st</span>
          !
        </p>

        <div className="top-marquee-track">
          <div className="top-marquee-group">
            {messageIndexes.map((index) => (
              <MarqueeMessage key={`group-a-${index}`} />
            ))}
          </div>

          <div className="top-marquee-group" aria-hidden="true">
            {messageIndexes.map((index) => (
              <MarqueeMessage key={`group-b-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
