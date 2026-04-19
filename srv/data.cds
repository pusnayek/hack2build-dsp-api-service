using AM_GV_CL_RevTiming_01 from '../db/data';


service DataService {

    entity RevTimingData as projection on AM_GV_CL_RevTiming_01;

    function getGreeting() returns String;

}