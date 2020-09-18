import { useThree } from 'react-three-fiber';
import { CubeTextureLoader } from 'three';

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const texture = loader.load([
    'https://i.imgur.com/z4BOzwJ.png',
    'https://i.imgur.com/z4BOzwJ.png',
    'https://i.imgur.com/z4BOzwJ.png',
    'https://i.imgur.com/z4BOzwJ.png',
    'https://i.imgur.com/z4BOzwJ.png',
    'https://i.imgur.com/z4BOzwJ.png',

  ]);

  scene.background = texture;
  return null;
};

export default Skybox;
