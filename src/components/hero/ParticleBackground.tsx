'use client'

export default function ParticleBackground() {
  return (
    <div 
      className="absolute inset-0 bg-black"
      style={{ zIndex: -1 }}
    />
  )
}