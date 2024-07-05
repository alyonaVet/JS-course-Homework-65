import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import MainPage from './containers/MainPage/MainPage';
import EditPage from './containers/EditPage/EditPage';

const App = () => {
  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/pages/:pageId" element={<MainPage/>}/>
          <Route path="/pages/admin" element={<EditPage/>}/>
          <Route path="*" element={<h3 className="mt-3 mb-5 text-center">Page not found</h3>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
