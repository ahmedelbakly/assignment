import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.pixabay.com", // Pixabay
      "picsum.photos", // Lorem Picsum
      "images.unsplash.com", // Unsplash
      "plus.unsplash.com", // Unsplash CDN
      "img.freepik.com", // Freepik
      "media.istockphoto.com", // iStock
      "static.vecteezy.com", // Vecteezy
      "upload.wikimedia.org", // Wikipedia images
      "res.cloudinary.com", // Cloudinary
      "images.pexels.com"
    ],
  },
};

export default nextConfig;
