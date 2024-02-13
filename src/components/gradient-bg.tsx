export default function GradientBg() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 h-full w-full object-cover blur-md"
    >
      <source src="/gradient-background.mp4" type="video/mp4" />
    </video>
  );
}
