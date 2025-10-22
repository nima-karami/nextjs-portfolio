import Image from 'next/image';

function Headshot() {
  return (
    <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200 md:h-48 md:w-48">
      <Image src="/images/headshot.jpg" alt="Nima Karami Headshot" fill />
    </div>
  );
}

export default Headshot;
