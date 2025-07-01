interface VideoSectionProps {
  videoSrc: string;
  titulo: string;
}

export default function VideoSection({ videoSrc, titulo }: VideoSectionProps) {
  return (
    <section className="mb-16 pt-8">
      <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Un poco de mi show</h2>
      <div className="rounded-lg p-6 shadow-lg">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full"
            src={videoSrc}
            title={titulo}
            controls
            playsInline
          />
        </div>
      </div>
    </section>
  );
} 