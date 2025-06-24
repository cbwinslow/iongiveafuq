import Dumbo from '../components/mascots/Dumbo';
import ArtworkViewer from '../components/viewer/ArtworkViewer';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Dumbo />
      <div className="mt-8 w-full">
        <ArtworkViewer />
      </div>
    </div>
  );
}
