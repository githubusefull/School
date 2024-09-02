import Renouveler from "@/components/forms/Renouveler";
import { Metadata } from "next";



export const metadata: Metadata = {
  title:'Renouveler',
}
const page = () => {

  


  return (
    <div className="justify-center">
   <Renouveler/>

    </div>
  )
}

export default page;