import '../styles/globals.css'
import NavigationLayout from "../components/navigation/NavigationLayout";
import UserContextProvider from "../components/contexts/ContextProvider";
import ClientOnly from "../components/utilities/ClientOnly";
import useSWRImmutable from "swr";
import {HttpGetStatus} from '../components/api/RequestAPI';
import {GET_STATUS_URL} from '../components/constant/Constants';

 
  
const MyApp = ({Component, pageProps}) => {
  
    return (
        <ClientOnly>
            <UserContextProvider>
                <NavigationLayout>
                    <Component {...pageProps}/>
                </NavigationLayout>
            </UserContextProvider>
        </ClientOnly>
    );
}
export default MyApp
