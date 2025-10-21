import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginForm from './components/LoginForm';
import QuestionBankPlus from './components/QuestionBankPlus';
import SignUpForm from './components/SignUpForm';

export default function App() {
  return (
    <>
      <LoginForm />
      <SignUpForm />
      <QuestionBankPlus />
    </>
  );
}
