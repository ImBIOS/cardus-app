import useImagePlaceholder from "lib/hooks/use-image-placeholder";
import Image from "next/image";

type Props = {
  images?: string[];
  className?: string;
};

const BoxItemImages = ({ images, className }: Props): JSX.Element => {
  const imagePlaceholder = useImagePlaceholder();

  if (images && images.length > 0) {
    if (images.length == 1)
      return (
        <div className={`relative h-16 w-12 overflow-hidden ${className}`}>
          <Image
            sizes="100%"
            alt=""
            src={images[0]}
            fill
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            className="rounded-md object-cover"
          />
        </div>
      );

    return (
      <>
        <div className="relative h-12 w-8 overflow-hidden opacity-80 backdrop-blur-sm">
          <Image
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            alt=""
            src={images[0]}
            fill
            sizes="100%"
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative -ml-4 h-16 w-12 overflow-hidden">
          <Image
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            sizes="100%"
            alt=""
            src={images[1]}
            fill
            className="rounded-md object-cover"
          />
        </div>
      </>
    );
  }

  // Default with no image
  return (
    <div
      className={`relative h-8 w-6 -rotate-12 overflow-hidden rounded-sm bg-blue-400 ${className}`}
    />
  );
};

export default BoxItemImages;
