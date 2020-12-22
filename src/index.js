import {Route} from '@core/route/Route';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import './scss/index.scss';

new Route('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
});
