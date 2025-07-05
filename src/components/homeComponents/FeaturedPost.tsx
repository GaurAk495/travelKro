import Image from "next/image";

function FeaturedPost() {
  return (
    <div className="featured-travel-destrinations px-4 md:px-20 py-16">
      <h2 className="text-center text-2xl sm:text-4xl font-semibold mb-5">
        Featured Travel Destinations
      </h2>
      <p className="text-center text-slate-500 mb-6">
        Check out some of the best places you can visit around the world.
      </p>
      <div className="grid gap-4 grid-cols-13 grid-rows-9">
        <div className="relative rounded-xl overflow-hidden col-span-10 row-span-4">
          <Image
            src="/assets/card-img-1.png"
            alt="test"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl col-span-3 row-span-3">
          <Image
            src="/assets/card-img-4.png"
            alt="test"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl col-span-3 row-span-3">
          <Image
            src="/assets/card-img-3.png"
            alt="test"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl col-span-5 row-span-5 ">
          <Image
            src="/assets/card-img-2.png"
            alt="test"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl col-span-5 row-span-5 ">
          <Image
            src="/assets/card-img-5.png"
            alt="test"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl col-span-3 row-span-3 ">
          <Image
            src="/assets/card-img-6.png"
            alt="test"
            fill
            className="absolute object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
