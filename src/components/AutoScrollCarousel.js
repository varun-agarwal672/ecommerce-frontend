import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "https://media-hosting.imagekit.io/3f9922ac375544c4/istockphoto-1204291128-1024x1024.jpg?Expires=1838271058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pbqKmPMHomHR2WyYMCMErn5ZPj0cOJn-ncIf3y3lqefQ81Q9e8b8Pccmx~y~Cya0a9iGkTNXOMD8s9hAAopl-nDyQS2xrq8Dorf80xkoaxv1B-EPglP9Q6YVfRPHzUk2sB5yXoPX7mbmZZFlNaNrkfLdjbZa-7Hy3z21efyhWXZ2X8s1Wq3BHeff8awcW5rkWaRTRunuUC5HxsyCNhlBk6QXIDJTOJJx3MHQ7Ns3c55zvndjKhzVIkh6~9sISkGKM-~I5kZ71fDAxZStKTmq471ivJv46ThHon00zdfPFO72sJoSKokOYXzRYw5orK1q-4PVdHCCmQBHbjCRVBdRgg__",
  "https://media-hosting.imagekit.io/a9e1da71f27a40de/istockphoto-1165045767-1024x1024.jpg?Expires=1838271058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c~D0sDi3rLESII0mtnx4icf4COcoz~btCL8g0J7nCfSDCn6zI~Tm66CdaL0ndiWJAZiFTcEqVAHD6LoVwLL4-f2AErzPFNCCTXBWKDe~LtrlaKucRGqGLuNsBKQ7Cp2ehWMi3J2Tj22nxx2wEDil1Ueqjyw74EjYgSGbWBVQ1P2SVfTUo-mabUi5W7H6YXqDHxP9QpzcrFJ2OWmySWmsOplCZ~vNlWapSdjOJfZSb12U0UshVpFxAw3sey3CJtZ-TB6Vr7r2olT8IW4kodeCCuyGCwIOm85o~Z2ylFEL2GnKjfFb4i-WDw61vlAcwgCJ5WY188XZF63LsfpcdbtVkg__",
  "https://media-hosting.imagekit.io/9d2824f08e76498f/istockphoto-1469519318-1024x1024.jpg?Expires=1838271058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=nBzJWycGKHxIzfbNEN~FHjEW3xagbO0MAaIpdx0kufucfjTHHOraXhXJ08I--0Fs2w3sfRmlPVDokgSLjjlnWvth5tRUgBGtuI7la88zCna7etIUcNJp~S7Jm-IOyQfXhkpgndqr7woOpJ0FSWiPrGAQ24QCrL2U8TIM0WR1ZhmRjlcpHLDvXwFFUo-vsZHF3wgTWo-GCV53Iid4KPoND94GCNea9t3PiKFzZkJzIQHS7AXf71P8OKBXx-~lnakL2gP4NGAA0e78DbBaOhbk5GSxGxycV5WVLKt-9GNDbL~PUwGhI2CT32lxrBq9s26T0NkNXkSsUgDfmNctraDWug__",
  "https://media-hosting.imagekit.io/5b5f6a68f6a240e7/istockphoto-1170330954-1024x1024.jpg?Expires=1838271058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OFEyk~8hs~ZrhKrSNFfbw7TBRQG2G9c1wICUy9hm0lxlRwyGLjJJMJ7nnG5whJ3MYcEpQdeZUcWQzPz~QCx84FKGQBvZoqEdMtveeL3OaXB4xqY9ORx2nkx82Ek5VVCXLvVtB7inyrfDm6dL6~E42oQxgHOLLKt4NfBUmAj-oqfjuG3r1hMGZ3bd89oHgYmj8paUQPw8nnehn2l2vdu17LhSuWk2w0kQBz77p~iQn1WvGl4Mf3EFllg8QfOKT~N000YOh3m9hIyzR6Vw44qC~BjspkLS0I5wP~oAp6ftArZngOfmXtilNOvUf8A-vSHsR5WYLc7z6AFTXD5xT8vTqg__",
  "https://media-hosting.imagekit.io/d6d7c7af23694639/istockphoto-1135800304-1024x1024.jpg?Expires=1838271058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ma9lWjBzFyquiERjCJ5ZjJId6dCP1Ck0zRi9pzVKEDQgF1Am0uF0FLjQDG-eJBqAZewPIzK9sZ~oNsLlTzcQFLnhStzM~OpR8Tw4NBtZqj1tK2eoftwSC8fpGVMxI~5n9Wdi74totOE4fLrXTsZsulWIJo3B0SYtLfhvCOmRmTFKWyleZP9Ixktfo6taov7Q9xgLwbnGte3n-BmnzH3WGYLXrU8Ux-5bA-BoDqyrt5nMBc0-T-jrWfz-F33dpyhc-JnCW-m-3aHqJL1tgSxrdanrB8j9THkASjjTenedijXl-s2P6fKmZnKKtBFnm0FSFDF4HtHqUWSfcwKZEFHKew__",
];

const AutoScrollCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[25/9] overflow-hidden rounded-lg flex justify-center items-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute object-contain transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          ❮
        </span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          ❯
        </span>
      </button>
    </div>
  );
};

export default AutoScrollCarousel;
