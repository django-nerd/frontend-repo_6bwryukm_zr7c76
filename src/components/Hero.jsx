import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <div className="relative w-full h-[360px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
      <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>
  )
}
