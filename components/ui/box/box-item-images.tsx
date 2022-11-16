import rgbDataURL from "helpers/image-placeholder";
import Image from "next/image";

type BoxItemImagesProps = {
  images?: { url: string }[];
};

const BoxItemImages = ({ images }: BoxItemImagesProps): JSX.Element => {
  if (images && images.length > 0) {
    if (images.length == 1)
      return (
        <div className="relative h-16 w-12 overflow-hidden">
          <Image
            sizes="100%"
            alt="cardus image 2"
            src={images[0].url}
            fill
            placeholder="blur"
            blurDataURL={rgbDataURL(96, 165, 250)}
            className="rounded-md object-cover"
          />
        </div>
      );

    return (
      <>
        <div className="relative h-12 w-8 overflow-hidden opacity-80	 backdrop-blur-sm">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(96, 165, 250)}
            sizes="100%"
            alt="cardus image 1"
            src={images[0].url}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative -ml-4 h-16 w-12 overflow-hidden">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(96, 165, 250)}
            sizes="100%"
            alt="cardus image 2"
            src={images[1].url}
            fill
            className="rounded-md object-cover"
          />
        </div>
      </>
    );
  }

  // Default with no image
  return (
    <div className="relative h-8 w-6 -rotate-12 overflow-hidden rounded-sm bg-blue-400" />
  );
};

export default BoxItemImages;
