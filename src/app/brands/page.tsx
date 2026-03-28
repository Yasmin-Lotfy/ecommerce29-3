import { getUserToken } from '@/lib/auth';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'

export default async function Brands() {


  const data = await getServerSession(authOptions);

  // console.log(data , "session data");

  const ourToken = await getUserToken();

  // if(!data){
  //   redirect("/login")
  // }

  // console.log(ourToken );
  
  
  return (
    <div>
      Brands
    </div>
  )
}
