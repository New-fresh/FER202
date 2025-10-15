import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AccountSearch from './components/AccountSearch';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import RegisterForm from './components/RegisterForm';
import SearchItem from './components/SeachItem';

function App() {
  return (
    <>
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <AccountSearch />
      <RegisterForm />
    </>
  );
}

export default App;
