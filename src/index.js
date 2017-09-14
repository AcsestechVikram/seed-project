/* eslint-disable no-console */
import $ from 'jquery';
window.jQuery = $;
import 'bootstrap-loader';
import './scss/index.scss';
import 'bootstrap-table';
// require('../public/js/bootstrap-editable.js');
// require('../node_modules/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.js');
// require('../public/js/select2.js');



  /* Variables Start */
  $('#section2').hide();
  const API_URL = 'http://'+location.host+'/';
  var $modal = $('#customerModal').modal({show:false});
  var $deleteCustomer = $('#deleteCustomer').modal({show:false});
  var $deleteProduct = $('#deleteProduct').modal({show:false});

  var $productModal = $('#productModal').modal({show:false});
  var $country = $('#countries');
  const customizeTable = {
    idField: 'id',
    url:'/customer',
    search:true,
    pagination:true,
    showToggle:true,
    showColumns:true,
    // queryParams: queryParams,
    // showRefresh: true,
    columns:[
      {
        field: '_id',
        title: 'Customer Id',
        sortable: true,
      },
      {
        field: 'firstName',
        title: 'First Name',
        sortable: true
      },
      {
        field: 'lastName',
        title: 'Last Name',
        sortable: true
      },
      {
        field: 'mobile',
        title: 'Mobile',
        sortable: true
      },
      {
        field: 'email',
        title: 'Email Id',
        sortable: true
      },
      {
        field: 'country',
        title: 'Country',
        sortable: true,
        showbuttons: false,

      },
      {
        field: 'products.length',
        title: 'Products',
        sortable: true,
        formatter: productFormatter,
        events: 'productEvents'
      },
      {
        field: 'action',
        title: 'Action',
        formatter: actionFormatter,
        events: 'actionEvents',
        width: 100
      }
    ],
  };

  let customizeProducts = {
    idField: 'id',
    search:true,
    pagination:true,
    showToggle:true,
    showColumns:true,
    columns:[
      {
        field: '_id',
        title: 'Product Id',
        sortable: true,
      },
      {
        field: 'product_name',
        title: 'Product Name',
        sortable: true
      },
      {
        field: 'product_price',
        title: 'Price',
        sortable: true
      },
      {
        field: 'product_catlog',
        title: 'Catalog',
        sortable: true
      },
      {
        field: 'action',
        title: 'Action',
        formatter: productactionFormatter,
        events: 'productActionEvents',
        width: 100
      }
    ]
  }
  var $customer = $('#customer');
  var $products = $('#products');
  var $submitButton = $modal.find('.submit');
  var $productSubmitButton = $productModal.find('.submit');
  var $confirmDeletion = $deleteCustomer.find('.submit');
  var $p_confirmDeletion = $deleteProduct.find('.submit');
  /* Variable End */

  $customer.bootstrapTable(customizeTable);

  $.each({"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Bartelemey", "BM": "Bermuda", "BN": "Brunei Darussalam", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "O1": "Other Country", "LV": "Latvia", "RW": "Rwanda", "RS": "Serbia", "TL": "Timor-Leste", "RE": "Reunion", "LU": "Luxembourg", "TJ": "Tajikistan", "RO": "Romania", "PG": "Papua New Guinea", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "BZ": "Belize", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "TM": "Turkmenistan", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "RU": "Russian Federation", "EE": "Estonia", "EG": "Egypt", "TK": "Tokelau", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "EU": "Europe", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova, Republic of", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania, United Republic of", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "FX": "France, Metropolitan", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands (Malvinas)", "FM": "Micronesia, Federated States of", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "CI": "Cote d'Ivoire", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos (Keeling) Islands", "CA": "Canada", "CG": "Congo", "CF": "Central African Republic", "CD": "Congo, The Democratic Republic of the", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syrian Arab Republic", "KG": "Kyrgyzstan", "KE": "Kenya", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "Korea, Republic of", "SI": "Slovenia", "KP": "Korea, Democratic People's Republic of", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "Virgin Islands, British", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Lao People's Democratic Republic", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "A1": "Anonymous Proxy", "TO": "Tonga", "LT": "Lithuania", "A2": "Satellite Provider", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libyan Arab Jamahiriya", "VA": "Holy See (Vatican City State)", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "Virgin Islands, U.S.", "IS": "Iceland", "IR": "Iran, Islamic Republic of", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AN": "Netherlands Antilles", "AQ": "Antarctica", "AP": "Asia/Pacific Region", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}, function(k, v) {
    // $country.append($("<option />").val(k).text(v));
    $country.append(new Option(v));
  });

  $('.create').click(function () {
    showModal($(this).text());
  });
  $('.createProduct').click(function () {
    showProductModal($(this).text());
  });
  $submitButton.click(function(){
    var row = {};
    $modal.find('input[name]').each(function () {
      row[$(this).attr('name')] = $(this).val();
    });
    console.log(row, API_URL + 'customer/' + ($modal.data('_id') || ''));
    $.ajax({
      url: API_URL + 'customer/' + ($modal.data('id') || ''),
      type: $modal.data('id') ? 'patch' : 'post',
      contentType: 'application/json',
      data: JSON.stringify(row),
      success: function () {
        $modal.modal('hide');
        $('#customer').bootstrapTable('refresh');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
      },
      error: function () {
        $modal.modal('hide');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'danger');
      }
    });
  });


  $productSubmitButton.click(function(){
    var row = {};
    $productModal.find('input[name]').each(function () {
      row[$(this).attr('name')] = $(this).val();
    });
    const customer_id = $('#customer_id').val();
    $.ajax({
      url: API_URL + 'products/'+customer_id+'/'+ ($productModal.data('id') || ''),
      type: $productModal.data('id') ? 'patch' : 'post',
      contentType: 'application/json',
      data: JSON.stringify(row),
      success: function () {
        $productModal.modal('hide');
        $('#products').bootstrapTable('refresh');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
      },
      error: function () {
        alert('sorry');
        $productModal.modal('hide');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'danger');
      }
    });
  });

  $confirmDeletion.click(function(){
    $.ajax({
      url: API_URL + 'customer/' + $deleteCustomer.data('id'),
      type: 'delete',
      contentType: 'application/json',
      success: function () {
        $deleteCustomer.modal('hide');
        $('#customer').bootstrapTable('refresh');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
      },
      error: function () {
        $deleteCustomer.modal('hide');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'danger');
      }
    });
  });


  $p_confirmDeletion.click(function(){
    $.ajax({
      url: API_URL + 'products/' + $deleteProduct.data('id'),
      type: 'delete',
      contentType: 'application/json',
      success: function () {
        $deleteProduct.modal('hide');
        $('#product').bootstrapTable('refresh');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
      },
      error: function () {
        $deleteCustomer.modal('hide');
        // showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'danger');
      }
    });
  });
window.actionEvents = {
  'click .update': function (e, value, row) {
    showModal($(this).attr('title'), row);
  },
  'click .remove': function (e, value, row) {
    $deleteCustomer.data('id', row._id);
    $deleteCustomer.modal('show');
    //const element = event.target;

    //const elementRow = element.parentNode.parentNode.parentNode;
    //elementRow.parentNode.removeChild(elementRow);
  }
};
window.productEvents ={
  'click .check': function (e, value, row) {
      $('#customer_id').val(row._id);
      // $('#customerfirstName').val(row.firstName);
      // $('#customerlastName').val(row.lastName);
      // $('#customermobile').val(row.mobile);
      // $('#customeremail').val(row.email);
      // $('#customercountry').val(row.country);
      customizeProducts.url='/products/'+row._id;
      $products.bootstrapTable(customizeProducts);
      $('#section1').hide();
      $('#section2').show();

  },
}
window.productActionEvents={
  'click .update': function (e, value, row) {
    showProductModal($(this).attr('title'), row);
  },
  'click .remove': function (e, value, row) {
    console.log(row);
    $deleteProduct.data('id', row._id);
    $deleteProduct.modal('show');
    //const element = event.target;

    //const elementRow = element.parentNode.parentNode.parentNode;
    //elementRow.parentNode.removeChild(elementRow);
  }
}
function showModal(title, row) {
  console.log($modal);
  row = row || {
      id: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      country: ''
    }; // default row value
  $modal.data('id', row._id);
  $modal.find('.modal-title').text(title);
  for (var name in row) {
    console.log(name);
    $modal.find('input[name="' + name + '"]').val(row[name]);
  }
  $modal.modal('show');

}


function showProductModal(title, row) {
  row = row || {
      product_name: '',
      product_price: '',
      product_catlog: ''
    }; // default row value
  $productModal.data('id', row._id);
  $productModal.find('.modal-title').text(title);
  for (var name in row) {
    console.log(name);
    $productModal.find('input[name="' + name + '"]').val(row[name]);
  }
  $productModal.modal('show');

}


function actionFormatter() {
  return [
    '<a class="update ml10" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>',
    '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
    '<i class="glyphicon glyphicon-remove"></i>',
    '</a>'
  ].join('');
}

function productFormatter(value){
  return[
  '<a class="check ml10" href="#checkProducts">'+value+'</i></a>'
  ].join('');
}

function productactionFormatter(){
  return [
    '<a class="update ml10" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>',
    '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
    '<i class="glyphicon glyphicon-remove"></i>',
    '</a>'
  ].join('');
}


