import Payement from "@/components/forms/Payement";
import { Metadata } from "next";



export const metadata: Metadata = {
  title:'Payement',
}
const page = () => {

  


  return (
    <div className="justify-center">
   <Payement/>

    </div>
  )
}

export default page;
