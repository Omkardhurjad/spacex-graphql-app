import LaunchList from '@/app/LaunchList';
import ScrollToTop from '@/app/scrolltotop'; 

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 
          bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg 
          animate-pulse transition-all duration-300 transform hover:scale-105 hover:drop-shadow-2xl">
        SpaceX Launches
      </h1>
      <LaunchList />
      <ScrollToTop />
    </div>
  );
}
