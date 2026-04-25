const cds = require('@sap/cds')
const axios = require('axios');

function prepareServieUrl(params, baseUrl) {
    let sQueryUrl = '';
    if(params['$select']) {
      sQueryUrl = '$select='.concat(decodeURIComponent(params['$select']));
    }
    if(params['$filter']) {
      if(sQueryUrl.length > 0) {
        sQueryUrl = sQueryUrl.concat('&');
      }
      sQueryUrl = sQueryUrl.concat('$filter='.concat(decodeURIComponent(params['$filter'])));
    }
    if(params['$search']) {
      if(sQueryUrl.length > 0) {
        sQueryUrl = sQueryUrl.concat('&');
      }
      sQueryUrl = sQueryUrl.concat('$search='.concat(decodeURIComponent(params['$search'])));
    }

    if(sQueryUrl && sQueryUrl.length > 0) {
      baseUrl = baseUrl.concat('?');
      baseUrl = baseUrl.concat(sQueryUrl);
    }
    // console.log(baseUrl)
    return baseUrl
}


class DataService extends cds.ApplicationService { init() {

  const { SalesPredictionActuals, SalesPedictionPast } = this.entities;
  const DSP_URL = 'https://vp-dsp-poc18.eu10.hcs.cloud.sap/api/v1/datasphere/consumption'

  this.on('READ', SalesPredictionActuals, async (req) => {
    let baseUrl = DSP_URL.concat("/relational/ZTEST_BDC_DACH_HANA/L1_H2B_CF_Transform_Data_with_actuals/L1_H2B_CF_Transform_Data_with_actuals")
    const params = req.http?.req?.query || {};    
    let response = await invokeService(baseUrl, params)
    let value = response.data?.value;
    return value;
  })

  this.on('READ', SalesPedictionPast, async (req) => {
    let baseUrl = DSP_URL.concat("/relational/ZTEST_BDC_DACH_HANA/L1_H2B_CF_Transform_Data_Merge/L1_H2B_CF_Transform_Data_Merge")
    const params = req.http?.req?.query || {};    
    let response = await invokeService(baseUrl, params)
    let value = response.data?.value;
    return value;
  })

  this.on('getGreeting', () => 'Hello World' ) 

  async function invokeService(baseUrl, params) {
      const access_token = await getAccessToken()
      baseUrl = prepareServieUrl(params, baseUrl)
      return await axios.get(baseUrl, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }, params: {
          '$top': params['$top'],
          '$skip': params['$skip']
        }
      })
  }

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