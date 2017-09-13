import $ from 'jquery';
import 'bootstrap-loader';
import './scss/index.scss';
import 'bootstrap-table';
require('../node_modules/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.js');
// require('./bootstrapEditable.js');


import {getUsers, deleteUser} from './api/userApi';
// import numeral from 'numeral';
// const courseValue = numeral(1000).format('$0,0.00');
/* eslint-disable no-console */
// //debugger;
// console.log(`I would pay ${courseValue} for this awesome course!`);
getUsers().then(result =>{
  let usersBody = "";
  result.forEach(user => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser"> Delete</a> </td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>`
  });

  global.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Must use array. from to create array from a DOM collection
  // getElementByClassname only returns an "array like" object
  Array.from(deleteLinks, link =>{
    link.onclick = function (event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  });
});


// import {getCustomers} from './api/customerApi';
// getCustomers().then(result=>{

// });
//


// function queryParams() {
//     return {
//         type: 'owner',
//         sort: 'updated',
//         direction: 'desc',
//         per_page: 100,
//         page: 1
//     };
// }


// function actionFormatter() {
//     console.log('hello');
//     return [
//         '<a class="like" href="javascript:void(0)" title="Like">',
//         '<i class="glyphicon glyphicon-heart"></i>',
//         '</a>',
//         '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
//         '<i class="glyphicon glyphicon-edit"></i>',
//         '</a>',
//         '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
//         '<i class="glyphicon glyphicon-remove"></i>',
//         '</a>'
//     ].join('');
// }

// window.actionEvents = {
//     'click .like': function (e, value, row, index) {
//         alert('You click like icon, row: ' + JSON.stringify(row));
//         console.log(value, row, index);
//     },
//     'click .edit': function (e, value, row, index) {
//         alert('You click edit icon, row: ' + JSON.stringify(row));
//         console.log(value, row, index);
//     },
//     'click .remove': function (e, value, row, index) {
//         alert('You click remove icon, row: ' + JSON.stringify(row));
//         console.log(value, row, index);
//     }
// };

const customizeTable = {
  idField: 'id',
  url:'http://localhost:3001/customers',
  search:true,
  pagination:true,
  showToggle:true,
  showColumns:true,
  // queryParams: queryParams,
  showRefresh: true,
  columns:[
    {
      field: 'id',
      title: 'Customer Id',
      sortable: true,
    },
    {
      field: 'firstName',
      title: 'First Name',
      sortable: true,
      // editable: true
    },
    {
      field: 'lastName',
      title: 'Last Name',
      sortable: true,
      // editable: {type: 'text'}
    },
    {
      field: 'mobile',
      title: 'Mobile',
      sortable: true,
      // editable: {type: 'text'}
    },
    {
      field: 'email',
      title: 'Email Id',
      sortable: true,
      // editable: {type: 'text'}
    },
    {
      field: 'country',
      title: 'Country',
      sortable: true,
      // editable: {type: 'text'}
    }
  ],
};

(function(customizeTable){
  console.log(customizeTable);
  $('#customer').bootstrapTable(customizeTable);
}(customizeTable));
