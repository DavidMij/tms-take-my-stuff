/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/api/:path*',
  //     },
  //     // {
  //     //   source: '/api/:path*',
  //     //   destination: 'http://takemystuff.cs.colman.ac.il:3000/api/:path*'
  //     // },
  //   ]
  // },
}
