import LayoutComponent from "./layout/LayoutComponent"
import layoutStore from './store/LayoutStore.ts'
import { ConfigProvider, theme } from 'antd'



function AppComponent() {

  const { defaultAlgorithm, darkAlgorithm } = theme
  const themeColor = layoutStore((state: any) => state.themeColor)
  const appTheme = themeColor === "dark" ? darkAlgorithm : defaultAlgorithm
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: appTheme
        }}>
        <LayoutComponent />
      </ConfigProvider>
    </>
  )
}

export default AppComponent
