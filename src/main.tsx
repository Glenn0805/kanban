import ReactDOM from 'react-dom/client'
import AppComponent from './AppComponent.tsx'
import { App } from 'antd'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <App notification={{ placement: "top" }}><AppComponent /></App>
  ,
)
