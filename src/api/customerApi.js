import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const  baseUrl = getBaseUrl();
export function getCustomers() {
  return get('customers');
}

export function deleteCustomer(id) {
  return del(`customers/${id}`);
}

function get(url) {
  return fetch(baseUrl+url).then(onSuccess, onError);
}
function del(url) {
  const request = new Request(baseUrl+url, {
    method: 'DELETE'
  });
  return fetch(request).then(onSuccess, onError);
}
function onSuccess(response) {
  return response.json;
}
function onError(error) {
  console.log(error);  // eslint-disable-line no-console
}
