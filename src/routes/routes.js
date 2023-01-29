import routePaths from '~/routePaths';
import HomeLayout from '~/layouts/HomeLayout';

import HomePage from '~/pages/HomePage';
import TransactionPage from '~/pages/TransactionPage';
import AnalysisPage from '~/pages/AnalysisPage';
import AccountPage from '~/pages/AccountPage';
import HistoryPage from '~/pages/HistoryPage';
import LoginPage from '~/pages/LoginPage';
import SignupPage from '~/pages/SignupPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import ChangePassPage from '~/pages/ChangePassPage';

const publicRoutes = [
  { path: routePaths.home, page: HomePage, layout: HomeLayout },
  { path: routePaths.transaction, page: TransactionPage, layout: HomeLayout },
  { path: routePaths.analysis, page: AnalysisPage, layout: HomeLayout },
  { path: routePaths.history, page: HistoryPage, layout: HomeLayout },
  { path: routePaths.account, page: AccountPage, layout: HomeLayout },
  { path: routePaths.login, page: LoginPage, layout: null },
  { path: routePaths.signup, page: SignupPage, layout: null },
  { path: routePaths.forgotpassword, page: ForgotPasswordPage, layout: null },
];

const privateRoutes = [
  { path: routePaths.changePassword, page: ChangePassPage, layout: HomeLayout },
];

export { publicRoutes, privateRoutes };
