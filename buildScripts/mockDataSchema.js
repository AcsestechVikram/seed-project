export const schema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 5,
      "maxItems": 10,
      "items": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
      },
      "required": ["id", "firstName", "lastName", "email"]
    },
    "products": {
      "type": "array",
      "minItems": 20,
      "maxItems": 30,
      "items": {
        "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
        "product_name": {
            "type": "string",
            "faker": "commerce.productName"
        },
        "product_price":{
            "type": "float",
            "faker": "commerce.price"
        },
        "product_catalog": {
          "type": "string",
          "faker": "commerce.product"
        }
      },
      "required":["id", "product_name","product_price", "product_catalog"]
    },
    "customers": {
      "type" : "array",
      "minItems": 5,
      "maxItems": 10,
      "items": {
        "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
        "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
        "lastName": {
          "type": "string",
          "faker": "name.lastName"
          },
        "email": {
          "type": "string",
          "faker": "internet.email"
          },
        "mobile": {
          "type": "string",
          "faker": "phone.phoneNumber"
          },
        "country":{
          "type": "string",
          "faker": "address.country"
        },
        "products":{
          "type": "object",
          "properties":{
            "product":{
              "type":"array",
              "minItems": 15,
              "maxItems": 20,
              "items":{
                "id": {
                    "type": "number",
                    "unique": true,
                    "minimum": 1
                  },
                  "product_name": {
                      "type": "string",
                      "faker": "commerce.productName"
                  },
                  "product_price":{
                      "type": "float",
                      "faker": "commerce.price"
                  },
                  "product_catalog": {
                    "type": "string",
                    "faker": "commerce.product"
                  }
                },
              "required":["id", "product_name","product_price", "product_catalog"]
            },
            "required":["product"]
          }
        }
      },
      "required":["id", "firstName", "lastName", "email", "mobile","country", "products"]
    },
  },
  "required": ["users","customers"]
};
