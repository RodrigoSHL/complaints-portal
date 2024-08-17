import { SimpleWidget } from "@/components";

 
 export default function MainPage() {
   return (
     <div className="text-black p-2">
       <h1 className="mt-2 text-3xl">Dashboard</h1>
       <span>General Information</span>
       <div className="flex flex-wrap">
          <SimpleWidget />
       </div>

     </div>
   );
 }

 