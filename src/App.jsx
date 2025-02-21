import {useAppContext} from "./contexts/app-context.jsx";
import {useEffect} from "react";
import { RouterProvider } from "react-router";
import  router from "./router";
import './core/i18n';


function App() {
  const {theme} = useAppContext();
  useEffect(() => {
      const head = document.head;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/css/${theme}.css`;
      head.appendChild(link);
      return () => {
          head.removeChild(link)
      }
  }, [theme]);



  return (
   <RouterProvider router={router} />
  )
}

export default App
