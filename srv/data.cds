using ViewSalesPredictionActuals from '../db/data';
using ViewSalesPedictionPast from '../db/data';

service DataService {

    function getGreeting() returns String;

    entity SalesPredictionActuals as projection on ViewSalesPredictionActuals;

    entity SalesPedictionPast as projection on ViewSalesPedictionPast;

}