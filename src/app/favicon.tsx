import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Favicon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'red',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '2px solid white',
          position: 'relative',
        }}
      >
        <div style={{
          background: 'white', 
          width: '100%', 
          height: '50%', 
          position: 'absolute',
          bottom: 0,
          borderBottomLeftRadius: '50%',
          borderBottomRightRadius: '50%'
        }}/>
        <div style={{
          background: 'white',
          width: '25%',
          height: '25%',
          borderRadius: '50%',
          position: 'absolute',
          border: '2px solid #222'
        }}/>
      </div>
    ),
    {
      ...size,
    }
  );
}
