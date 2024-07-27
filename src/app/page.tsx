import Homepage from '../components/home/Homepage';

  export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
       <Homepage />
     
      </div>
    </div>
  );
}
