const cds = require('@sap/cds')
const axios = require('axios');

class DataService extends cds.ApplicationService { init() {

  const { RevTimingData } = this.entities;
  // const datasphereApiConst = JSON.parse(process.env.DATASPHERE_OAUTH_ACCESS);  
  // const {client_id, client_secret, auth_refresh_token, hostname, authhostname} = datasphereApiConst
  //?$filter=CompanyCode eq '1710' and PurchaseOrder eq '5000000006'

  this.on('getGreeting', () => 'Hello World' ) 

  this.on('READ', RevTimingData, async (req) => {
    let baseUrl = "https://vp-dsp-poc18.eu10.hcs.cloud.sap/api/v1/datasphere/consumption/analytical/IBM_HACK2B_REVTIMING/AM_GV_CL_RevTiming_01/AM_GV_CL_RevTiming_01(TARGET_CURRENCY=?)/Set";
    const access_token = await getAccessToken()
    // console.log(req.http.req.query)
    // console.log(req.http.req)
    const oQuery = req.http.req.query;
    let targetCurrency = oQuery['TARGET_CURRENCY']
    targetCurrency = targetCurrency ? targetCurrency : "'USD'"
    console.log(targetCurrency)
    baseUrl = baseUrl.replace('?', decodeURIComponent(targetCurrency))
    console.log(baseUrl)
    let sQueryUrl = '';
    if(oQuery['$select']) {
      sQueryUrl = '$select='.concat(decodeURIComponent(oQuery['$select']));
    }
    if(oQuery['$filter']) {
      if(sQueryUrl.length > 0) {
        sQueryUrl = sQueryUrl.concat('&');
      }
      sQueryUrl = sQueryUrl.concat('$filter='.concat(decodeURIComponent(oQuery['$filter'])));
    }
    if(sQueryUrl && sQueryUrl.length > 0) {
      baseUrl = baseUrl.concat('?');
      baseUrl = baseUrl.concat(sQueryUrl);
    }
    console.log(baseUrl)
    let response = await axios.get(baseUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    // response = response.value.map(function(item) {      
    //   console.log(JSON.stringify(item))
    //   return item
    // })
    // console.log(response.data)

    return response.data;
  })

  async function getAccessToken() {
    const tokenUrl = 'https://vp-dsp-poc18.authentication.eu10.hana.ondemand.com/oauth/token';
    const clientId = 'XXXX';
    const clientSecret = 'XXXXX';

    // Format body as x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    // params.append('scope', 'your_optional_scope'); // Optional

    try {
        const response = await axios.post(tokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // console.log('Access Token:', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
    }
  }

  return super.init()
}}

module.exports = { DataService }