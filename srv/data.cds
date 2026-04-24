using AM_GV_CL_RevTiming_01 from '../db/data';
using SalesOrderView from '../db/data';


service DataService {

    entity RevTimingData as projection on AM_GV_CL_RevTiming_01;

    entity SalesOrder as projection on SalesOrderView;

    function getGreeting() returns String;

    function getPurchaseOrderDetails(PurchaseOrder: String) returns many RevTimingData;

    function getPurchaseOrderDetailsV1(PurchaseOrder: String) returns RevTimingData;

    function getSalesOrdersByMaterial(Material: String) returns many SalesOrder;

}