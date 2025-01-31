import './App.css'
import ProductProvider from './store/context'

function App({children}) {
  

  return (
    <div className='container-fluid'>
      <ProductProvider>
        <h3>Vendor portal</h3>
        {children}
      </ProductProvider>
    </div>
  )
}

export default App
