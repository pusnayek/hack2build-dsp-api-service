const cds = require('@sap/cds')
const axios = require('axios');

class DataService extends cds.ApplicationService { init() {

  const { RevTimingData } = this.entities;
  const DSP_URL = 'https://vp-dsp-poc18.eu10.hcs.cloud.sap/api/v1/datasphere/consumption'

  this.on('getGreeting', () => 'Hello World' ) 

  this.on('getSalesOrdersByMaterial', async (req, res) => {
    const { Material } = req.data 
    let sRelativePath = `/relational/ZTEST_BDC_DACH_HANA/L1_H2B_CF_Transform_Data_Merge/L1_H2B_CF_Transform_Data_Merge?$filter=Material eq '${Material}'`
    let baseUrl = DSP_URL.concat(sRelativePath)
    const access_token = await getAccessToken()
    console.log(baseUrl)
    let response = await axios.get(baseUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    // let value = response.data?.value;
    // return {"result" : value};
    return response.data?.value;
  })

  this.on('getPurchaseOrderDetailsV1', async (req, res) => {
    let { PurchaseOrder } = req.data 
    if(!PurchaseOrder) {
      PurchaseOrder = req.http?.req?.query?.["PurchaseOrder"];
      if(PurchaseOrder && PurchaseOrder.length > 0) {
        PurchaseOrder = PurchaseOrder.substring(1,PurchaseOrder.length-1)
      }
    }
    console.log(PurchaseOrder)
    let sRelativePath = `/analytical/IBM_HACK2B_REVTIMING/AM_GV_CL_RevTiming_01/AM_GV_CL_RevTiming_01(TARGET_CURRENCY='USD')/Set?$filter=PurchaseOrder eq '${PurchaseOrder}'`
    let baseUrl = DSP_URL.concat(sRelativePath)
    const access_token = await getAccessToken()
    console.log(baseUrl)
    let response = await axios.get(baseUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    // console.log(response.data)
    let value = response.data?.value.shift();
    // return JSON.stringify(value);
    return {"result": value };
    // return response.data;
  })

  this.on('getPurchaseOrderDetails', async (req, res) => {
    let { PurchaseOrder } = req.data 
    if(!PurchaseOrder) {
      PurchaseOrder = req.http?.req?.query?.["PurchaseOrder"];
      if(PurchaseOrder && PurchaseOrder.length > 0) {
        PurchaseOrder = PurchaseOrder.substring(1,PurchaseOrder.length-1)
      }
    }
    console.log(PurchaseOrder)
    let sRelativePath = `/analytical/IBM_HACK2B_REVTIMING/AM_GV_CL_RevTiming_01/AM_GV_CL_RevTiming_01(TARGET_CURRENCY='USD')/Set?$filter=PurchaseOrder eq '${PurchaseOrder}'`
    let baseUrl = DSP_URL.concat(sRelativePath)
    const access_token = await getAccessToken()
    console.log(baseUrl)
    let response = await axios.get(baseUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    // console.log(response.data)
    // let value = response.data?.value.shift();
    let value = response.data?.value.shift();
    // return JSON.stringify(value);
    return value;
    // return response.data;
  })

  this.on('READ', RevTimingData, async (req) => {
    let baseUrl = DSP_URL.concat("/analytical/IBM_HACK2B_REVTIMING/AM_GV_CL_RevTiming_01/AM_GV_CL_RevTiming_01(TARGET_CURRENCY=?)/Set")
    const access_token = await getAccessToken()
    console.log(access_token)
    // console.log(req.http.req.query)
    // console.log(req.http.req)
    const oQuery = req.http?.req?.query;
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
    let value = response.data?.value;
    return value;
  })

  async function getAccessToken() {
    const tokenUrl = 'https://vp-dsp-poc18.authentication.eu10.hana.ondemand.com/oauth/token';
    const clientId = 'sb-97689a5c-7d42-47a2-adbc-bdb5997f4c27!b573821|client!b3650';
    const clientSecret = 'c3eebc7f-b3c0-4be2-9946-62cfdcdd2287$cXqFRxsDh-6CqtbBz7_4v_rFjdw-9NFhcVTlwy9P9ls=';

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